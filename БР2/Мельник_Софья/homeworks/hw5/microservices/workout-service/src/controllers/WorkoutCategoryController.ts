import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { WorkoutCategory } from '../entities/WorkoutCategory';

const workoutCategoryRepository = AppDataSource.getRepository(WorkoutCategory);

export const getWorkoutCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workoutCategories = await workoutCategoryRepository.find({ relations: ['workout', 'category'] });
    res.json(workoutCategories);
  } catch (error) {
    next(error);
  }
};

export const getWorkoutCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const workoutCategory = await workoutCategoryRepository.findOne({
      where: { id: Number(id) },
      relations: ['workout', 'category'],
    });

    if (!workoutCategory) {
      res.status(404).json({ message: 'Workout category not found' });
      return;
    }

    res.json(workoutCategory);
  } catch (error) {
    next(error);
  }
};

export const createWorkoutCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newWorkoutCategory = workoutCategoryRepository.create(req.body);
    const result = await workoutCategoryRepository.save(newWorkoutCategory);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateWorkoutCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await workoutCategoryRepository.update(id, req.body);
    res.json({ message: 'Workout category updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkoutCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await workoutCategoryRepository.delete(id);
    res.json({ message: 'Workout category deleted' });
  } catch (error) {
    next(error);
  }
};
