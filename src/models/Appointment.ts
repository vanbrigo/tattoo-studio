import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity("appointments")
export class Appointment extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  appointment_available_id!: number

  @Column()
  purpose!: boolean

  @Column()
  user_id!: number

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
