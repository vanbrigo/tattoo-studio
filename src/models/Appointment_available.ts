import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Appointment } from "./Appointment"

@Entity("appointments_available")
export class Appointment_available extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  date!: Date

  @Column()
  time!: string

  @Column()
  tattoo_artist_id!: number

  @Column()
  is_available!: boolean

  @ManyToOne(() => User, (user) => user.appointment_available)
  @JoinColumn({ name: "tattoo_artist_id" })
  user!: User

  @OneToOne(() => Appointment, (appointment) => appointment.appointmentA)
  appointment!: Appointment

}
