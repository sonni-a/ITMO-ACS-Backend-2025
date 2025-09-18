import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserProgress } from "./UserProgress";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  birth_date!: Date;

  @Column()
  gender!: string;

  @Column()
  weight!: number;

  @Column()
  height!: number;

  @Column()
  registration_date!: Date;

  @Column()
  goal!: string;

  @Column()
  experience_level!: string;

  @OneToMany(() => UserProgress, (progress) => progress.user)
  progress!: UserProgress[];
}