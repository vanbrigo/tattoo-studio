import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity("portfolios")
export class Portfolio extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  image_url!: string

  @Column()
  user_id!: number

  @ManyToOne(() => User, (user) => user.portfolio)
  @JoinColumn({ name: "user_id" })
  user!: User

}
