import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { BlogPost } from '../entities/BlogPost';
import { User } from '../entities/User';

const blogPostRepository = AppDataSource.getRepository(BlogPost);
const userRepository = AppDataSource.getRepository(User);

export const getBlogPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await blogPostRepository.find({ relations: ['author'] });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getBlogPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await blogPostRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!post) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, content, publish_date } = req.body;

    const authorId = (req as any).user.userId;

    const author = await userRepository.findOneBy({ id: Number(authorId) });
    if (!author) {
      res.status(400).json({ message: 'Author not found' });
      return;
    }

    const newPost = blogPostRepository.create({
      title,
      content,
      publish_date,
      author,
    });

    const result = await blogPostRepository.save(newPost);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, publish_date } = req.body;

    const post = await blogPostRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!post) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }

    const currentUserId = (req as any).user.userId;
    if (post.author.id !== currentUserId) {
      res.status(403).json({ message: 'Forbidden: you can only update your own posts' });
      return;
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (publish_date) post.publish_date = publish_date;

    await blogPostRepository.save(post);
    res.json({ message: 'Blog post updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await blogPostRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!post) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }

    const currentUserId = (req as any).user.userId;
    if (post.author.id !== currentUserId) {
      res.status(403).json({ message: 'Forbidden: you can only delete your own posts' });
      return;
    }

    await blogPostRepository.remove(post);
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
};
