import { sendUserCreatedEvent } from '../rabbit/rabbit';
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/app-data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { UpdateUserDto } from "../dtos/UpdateUserDto";

const userRepository = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserByIdOrEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email } = req.query;

    let user;
    if (email) {
      user = await userRepository.findOneBy({ email: String(email) });
    } else {
      user = await userRepository.findOneBy({ id: Number(id) });
    }

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = plainToInstance(CreateUserDto, req.body);

    const errors = await validate(dto, { skipMissingProperties: false });
    if (errors.length > 0) {
      const messages = errors.map(e => Object.values(e.constraints || {})).flat();
      return res.status(400).json({ errors: messages });
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = userRepository.create({
      ...dto,
      password: hashedPassword,
      birth_date: new Date(dto.birth_date),
      registration_date: dto.registration_date ? new Date(dto.registration_date) : new Date(),
    });

    await sendUserCreatedEvent(newUser);

    const result = await userRepository.save(newUser);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (req.user?.userId !== Number(id)) {
      return res.status(403).json({ message: "Forbidden: can only update your profile" });
    }

    const dto = plainToInstance(UpdateUserDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const messages = errors.map(e => Object.values(e.constraints || {})).flat();
      return res.status(400).json({ errors: messages });
    }

    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    if (dto.birth_date) dto.birth_date = new Date(dto.birth_date) as any;
    if (dto.registration_date) dto.registration_date = new Date(dto.registration_date) as any;

    await userRepository.update(id, dto);
    res.json({ message: "User updated" });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (req.user?.userId !== Number(id)) {
      return res.status(403).json({ message: "Forbidden: can only delete your profile" });
    }
    await userRepository.delete(id);
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};