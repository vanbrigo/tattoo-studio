import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

}
