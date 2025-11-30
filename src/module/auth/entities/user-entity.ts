import { UserRole } from "src/common/pipe/constants/role";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null,nullable:true })
  otp: number;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @Column({ default: false, nullable: true })
  isVerify: string;

  @Column({ type: "bigint", nullable: true, default: 0 })
  otpTime: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
