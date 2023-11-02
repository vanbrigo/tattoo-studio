import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

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

    @OneToOne(() => User, (user) => user.profile) 
    @JoinColumn({name:"user_id"})
    user!: User

}
