import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Plan } from './Plan';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @Column()
  authorId!: number;

  @Column()
  publish_date!: Date;

  @ManyToOne(() => Plan, (plan) => plan.blogPosts, { nullable: true })
  plan?: Plan;
}