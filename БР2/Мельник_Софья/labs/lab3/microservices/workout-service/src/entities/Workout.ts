import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WorkoutCategory } from "./WorkoutCategory";

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  type!: string;

  @Column()
  difficulty!: string;

  @Column()
  duration!: number;

  @Column({ nullable: true })
  video_url?: string;

  @Column("text")
  instruction!: string;

  @OneToMany(() => WorkoutCategory, (workoutCategory) => workoutCategory.workout)
  workoutCategories!: WorkoutCategory[];
}