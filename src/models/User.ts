import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Appointment_available } from "./Appointment_available"
import { Profile } from "./Profile"
import { Portfolio } from "./Portfolio"
import { Appointment } from "./Appointment"

@Entity("users") 
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  phone_number!: string

  @Column()
  role!: string

  @Column()
  is_active!: boolean
  
  @Column()
  joined_at!: Date
  
  @Column()
  updated_at!: Date

  @OneToMany(() => Appointment_available, (appointment_available) => appointment_available.user)
  appointment_available!: Appointment_available[]

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolio!: Portfolio[]

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments!: Appointment[]

  @OneToOne(() => Profile, (profile) => profile.user)
  profile!: Profile

}
