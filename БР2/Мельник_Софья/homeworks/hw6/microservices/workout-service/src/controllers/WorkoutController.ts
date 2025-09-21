import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { Workout } from '../entities/Workout';

const workoutRepository = AppDataSource.getRepository(Workout);

export const getWorkouts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workouts = await workoutRepository.find({ relations: ['workoutCategories'] });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
};

export const getWorkoutById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const workout = await workoutRepository.findOne({
      where: { id: Number(id) },
      relations: ['workoutCategories'],
    });

    if (!workout) {
      res.status(404).json({ message: 'Workout not found' });
      return;
    }

    res.json(workout);
  } catch (error) {
    next(error);
  }
};

export const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newWorkout = workoutRepository.create(req.body);
    const result = await workoutRepository.save(newWorkout);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await workoutRepository.update(id, req.body);
    res.json({ message: 'Workout updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await workoutRepository.delete(id);
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    next(error);
  }
};
