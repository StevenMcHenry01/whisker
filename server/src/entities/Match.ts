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
export class Match extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date()

  @Field(() => Cat)
  @Column(() => Cat)
  match!: Cat

  @Field(() => Cat)
  @ManyToOne(() => Cat, (cat) => cat.matches)
  cat!: Cat
}
