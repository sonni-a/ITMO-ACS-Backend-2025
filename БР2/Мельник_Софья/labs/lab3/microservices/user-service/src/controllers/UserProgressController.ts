import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/app-data-source";
import { UserProgress } from "../entities/UserProgress";
import { User } from "../entities/User";

const progressRepo = AppDataSource.getRepository(UserProgress);
const userRepo = AppDataSource.getRepository(User);

export const getUserProgresses = async (req: Request, res: Response) => {
  const progresses = await progressRepo.find({ relations: ["user"] });
  res.json(progresses);
};

export const getUserProgressById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const progress = await progressRepo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["user"],
    });
    if (!progress) return res.status(404).json({ message: "Progress not found" });
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const createUserProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await userRepo.findOneBy({ id: req.user.userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const progress = progressRepo.create({
      user,
      progress_date: new Date(req.body.progress_date),
      weight: req.body.weight,
      completed_workouts: req.body.completed_workouts,
    });
    const result = await progressRepo.save(progress);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateUserProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const progress = await progressRepo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["user"],
    });
    if (!progress) return res.status(404).json({ message: "Progress not found" });
    if (progress.user.id !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden: not your progress" });
    }

    await progressRepo.update(req.params.id, req.body);
    res.json({ message: "Progress updated" });
  } catch (err) {
    next(err);
  }
};

export const deleteUserProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const progress = await progressRepo.findOne({
      where: { id: Number(req.params.id) },
      relations: ["user"],
    });
    if (!progress) return res.status(404).json({ message: "Progress not found" });
    if (progress.user.id !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden: not your progress" });
    }

    await progressRepo.delete(req.params.id);
    res.json({ message: "Progress deleted" });
  } catch (err) {
    next(err);
  }
};