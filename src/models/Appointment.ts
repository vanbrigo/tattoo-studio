import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Appointment_available } from "./Appointment_available"

@Entity("appointments")
export class Appointment extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  appointment_available_id!: number

  @Column()
  purpose!: string

  @Column()
  user_id!: number

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToOne(() => Appointment_available, (appointmentA) => appointmentA.appointment) 
  @JoinColumn({name:"appointment_available_id"})
  appointmentA!: Appointment_available

}
