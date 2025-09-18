import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { WorkoutPlan } from '../entities/WorkoutPlan';
import { Plan } from '../entities/Plan';
import axios from 'axios';

const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
const planRepository = AppDataSource.getRepository(Plan);

// URL workout-service
const WORKOUT_SERVICE_URL = process.env.WORKOUT_SERVICE_URL || 'http://localhost:3002/workouts';

// Получение всех workout-планов (с подтягиванием данных о тренировках)
export const getWorkoutPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workoutPlans = await workoutPlanRepository.find({ relations: ['plan'] });

    const detailed = await Promise.all(
      workoutPlans.map(async (wp) => {
        try {
          const { data } = await axios.get(`${WORKOUT_SERVICE_URL}/${wp.workoutId}`);
          return { ...wp, workout: data };
        } catch {
          return { ...wp, workout: null };
        }
      })
    );

    res.json(detailed);
  } catch (error) {
    next(error);
  }
};

// Получение workout-плана по ID
export const getWorkoutPlanById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const workoutPlan = await workoutPlanRepository.findOne({
      where: { id: Number(id) },
      relations: ['plan'],
    });

    if (!workoutPlan) {
      res.status(404).json({ message: 'Workout plan not found' });
      return;
    }

    // Подтягиваем данные тренировки
    let workout = null;
    try {
      const { data } = await axios.get(`${WORKOUT_SERVICE_URL}/${workoutPlan.workoutId}`);
      workout = data;
    } catch {
      workout = null;
    }

    res.json({ ...workoutPlan, workout });
  } catch (error) {
    next(error);
  }
};

// Создание workout-плана
export const createWorkoutPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { workoutId, day_of_week, planId } = req.body;

    const plan = await planRepository.findOneBy({ id: Number(planId) });
    if (!plan) {
      res.status(400).json({ message: 'Plan not found' });
      return;
    }

    // Проверяем, существует ли тренировка в workout-service
    try {
      await axios.get(`${WORKOUT_SERVICE_URL}/${workoutId}`);
    } catch {
      return res.status(400).json({ message: 'Workout not found in workout-service' });
    }

    const newWorkoutPlan = workoutPlanRepository.create({
      workoutId,
      day_of_week,
      plan,
    });

    const result = await workoutPlanRepository.save(newWorkoutPlan);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Обновление workout-плана
export const updateWorkoutPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { workoutId, day_of_week, planId } = req.body;

    const workoutPlan = await workoutPlanRepository.findOne({
      where: { id: Number(id) },
      relations: ['plan'],
    });
    if (!workoutPlan) {
      res.status(404).json({ message: 'Workout plan not found' });
      return;
    }

    if (workoutId) {
      try {
        await axios.get(`${WORKOUT_SERVICE_URL}/${workoutId}`);
        workoutPlan.workoutId = workoutId;
      } catch {
        return res.status(400).json({ message: 'Workout not found in workout-service' });
      }
    }

    if (day_of_week) workoutPlan.day_of_week = day_of_week;

    if (planId) {
      const plan = await planRepository.findOneBy({ id: Number(planId) });
      if (!plan) {
        res.status(400).json({ message: 'Plan not found' });
        return;
      }
      workoutPlan.plan = plan;
    }

    await workoutPlanRepository.save(workoutPlan);
    res.json({ message: 'Workout plan updated' });
  } catch (error) {
    next(error);
  }
};

// Удаление workout-плана
export const deleteWorkoutPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const workoutPlan = await workoutPlanRepository.findOneBy({ id: Number(id) });
    if (!workoutPlan) {
      res.status(404).json({ message: 'Workout plan not found' });
      return;
    }

    await workoutPlanRepository.remove(workoutPlan);
    res.json({ message: 'Workout plan deleted' });
  } catch (error) {
    next(error);
  }
};