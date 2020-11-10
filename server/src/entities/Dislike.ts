// 3rd party imports

// my imports
import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Cat } from './Cat'

@ObjectType()
@Entity()
// extend allows base sql commands link find() and insert()
export class Dislike extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date()

  @Field()
  @Column()
  dislikesId!: number

  @Field(() => Cat)
  @ManyToOne(() => Cat, (cat) => cat.dislikes)
  dislikerCat!: Cat
}
