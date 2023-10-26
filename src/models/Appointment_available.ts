import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

}
