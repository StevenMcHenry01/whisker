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

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date()

  @Field(() => Cat)
  @Column({ type: 'int', unique: true })
  matched_cat!: Cat

  @Field(() => Cat)
  @ManyToOne(() => Cat, (cat) => cat.matches)
  cat!: Cat
}
