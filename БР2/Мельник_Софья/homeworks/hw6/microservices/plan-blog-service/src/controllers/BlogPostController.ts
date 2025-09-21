import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { BlogPost } from '../entities/BlogPost';
import { Plan } from '../entities/Plan';

const blogPostRepository = AppDataSource.getRepository(BlogPost);
const planRepository = AppDataSource.getRepository(Plan);


export const getBlogPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await blogPostRepository.find({ relations: ['plan'] });
    console.log('Fetched blog posts:', posts);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    next(error);
  }
};

export const getBlogPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await blogPostRepository.findOne({
      where: { id: Number(id) },
      relations: ['plan'],
    });
    console.log('Fetched blog post by id:', post);
    if (!post) return res.status(404).json({ message: 'Blog post not found' });
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post by id:', error);
    next(error);
  }
};

export const createBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, publish_date, planId } = req.body;
    const authorId = req.user?.userId;

    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized: missing user in token' });
    }

    let plan: Plan | undefined;
    if (planId) {
      const foundPlan = await planRepository.findOneBy({ id: Number(planId) });
      if (!foundPlan) return res.status(400).json({ message: 'Plan not found' });
      plan = foundPlan;
    }

    const newPost = blogPostRepository.create({
      title,
      content,
      publish_date,
      authorId,
      plan,
    });

    const result = await blogPostRepository.save(newPost);
    console.log('Created new blog post:', result);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating blog post:', error);
    next(error);
  }
};

export const updateBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content, publish_date, planId } = req.body;
    const authorId = req.user?.userId;

    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized: missing user in token' });
    }

    const post = await blogPostRepository.findOne({
      where: { id: Number(id) },
      relations: ['plan'],
    });
    if (!post) return res.status(404).json({ message: 'Blog post not found' });

    if (post.authorId !== authorId) {
      return res.status(403).json({ message: 'Forbidden: you are not the author' });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (publish_date) post.publish_date = publish_date;

    if (planId !== undefined) {
      if (planId === null) {
        post.plan = undefined;
      } else {
        const plan = await planRepository.findOneBy({ id: Number(planId) });
        if (!plan) return res.status(400).json({ message: 'Plan not found' });
        post.plan = plan;
      }
    }

    const updatedPost = await blogPostRepository.save(post);
    console.log('Updated blog post:', updatedPost);
    res.json({ message: 'Blog post updated', updatedPost });
  } catch (error) {
    console.error('Error updating blog post:', error);
    next(error);
  }
};

export const deleteBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const authorId = req.user?.userId;

    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized: missing user in token' });
    }

    const post = await blogPostRepository.findOneBy({ id: Number(id) });
    if (!post) return res.status(404).json({ message: 'Blog post not found' });

    if (post.authorId !== authorId) {
      return res.status(403).json({ message: 'Forbidden: you are not the author' });
    }

    await blogPostRepository.remove(post);
    console.log('Deleted blog post:', post);
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    next(error);
  }
};