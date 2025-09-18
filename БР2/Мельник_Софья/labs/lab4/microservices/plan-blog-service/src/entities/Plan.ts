import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BlogPost } from "./BlogPost";
import { WorkoutPlan } from "./WorkoutPlan";

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column()
  start_date!: Date;

  @Column()
  end_date!: Date;

  @OneToMany(() => BlogPost, (post) => post.plan)
  blogPosts!: BlogPost[];

  @OneToMany(() => WorkoutPlan, (workoutPlan) => workoutPlan.plan)
  workoutPlans!: WorkoutPlan[];
}