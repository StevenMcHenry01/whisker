// 3rd party imports

// my imports
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Cat } from './Cat'
import { User } from './User'

@ObjectType()
@Entity()
// extend allows base sql commands link find() and insert()
export class Pic extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date()

  @Field()
  @Column()
  url!: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.pics, {
    onDelete: 'CASCADE',
  })
  user: User

  @Field(() => Cat, { nullable: true })
  @ManyToOne(() => Cat, (cat) => cat.pics, {
    onDelete: 'CASCADE',
  })
  cat: Cat
}
