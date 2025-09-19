import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { Category } from '../entities/Category';

const categoryRepository = AppDataSource.getRepository(Category);

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryRepository.find({ relations: ['workoutCategories'] });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await categoryRepository.findOne({
      where: { id: Number(id) },
      relations: ['workoutCategories'],
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = categoryRepository.create(req.body);
    const result = await categoryRepository.save(newCategory);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await categoryRepository.update(id, req.body);
    res.json({ message: 'Category updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await categoryRepository.delete(id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};
