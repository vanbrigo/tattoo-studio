import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("profiles")
export class Profile extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    birthdate!: Date
  
    @Column()
    gender!: string

    @Column()
    address!: string
  
    @Column()
    user_id!: number
  
}
