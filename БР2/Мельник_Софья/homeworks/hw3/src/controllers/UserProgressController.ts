import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { UserProgress } from '../entities/UserProgress';
import { User } from '../entities/User';

const userProgressRepository = AppDataSource.getRepository(UserProgress);
const userRepository = AppDataSource.getRepository(User);

export const getUserProgresses = async (req: Request, res: Response) => {
  const progresses = await userProgressRepository.find({
    relations: ['user'],
  });
  res.json(progresses);
};

export const getUserProgressById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const progress = await userProgressRepository.findOne({
      where: { id: Number(id) },
      relations: ['user'],
    });

    if (!progress) {
      res.status(404).json({ message: 'User progress not found' });
      return;
    }

    res.json(progress);
  } catch (error) {
    next(error);
  }
};


export const createUserProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    
    const { progress_date, weight, completed_workouts } = req.body;
    const userId = req.user.userId;

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const newProgress = userProgressRepository.create({
      user,
      progress_date: new Date(progress_date),
      weight,
      completed_workouts
    });

    const result = await userProgressRepository.save(newProgress);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};


export const updateUserProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const userId = req.user.userId;

    const progress = await userProgressRepository.findOne({
      where: { id: Number(id) },
      relations: ['user'],
    });

    if (!progress) {
      res.status(404).json({ message: 'Progress not found' });
      return;
    }

    if (progress.user.id !== userId) {
      res.status(403).json({ message: 'Forbidden: not your progress' });
      return;
    }

    await userProgressRepository.update(id, req.body);
    res.json({ message: 'User progress updated' });
  } catch (error) {
    next(error);
  }
};


export const deleteUserProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const userId = req.user.userId;

    const progress = await userProgressRepository.findOne({
      where: { id: Number(id) },
      relations: ['user'],
    });

    if (!progress) {
      res.status(404).json({ message: 'Progress not found' });
      return;
    }

    if (progress.user.id !== userId) {
      res.status(403).json({ message: 'Forbidden: not your progress' });
      return;
    }

    await userProgressRepository.delete(id);
    res.json({ message: 'User progress deleted' });
  } catch (error) {
    next(error);
  }
};