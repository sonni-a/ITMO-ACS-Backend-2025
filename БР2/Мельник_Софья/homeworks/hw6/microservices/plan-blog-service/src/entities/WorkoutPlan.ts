import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Plan } from "./Plan";

@Entity()
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Plan, (plan) => plan.workoutPlans, { onDelete: "CASCADE" })
  plan!: Plan;

  // ID тренировки из workout-service
  @Column()
  workoutId!: number;

  @Column()
  day_of_week!: string;
}
