import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
