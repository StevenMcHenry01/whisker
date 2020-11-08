import { ObjectType, Field, Int } from 'type-graphql'
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { Message } from './Message'
import { User } from './User'

@ObjectType()
@Entity()
// extend allows base sql commands link find() and insert()
export class ChatSession extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date()

  @Field(() => User)
  @Column({ type: 'int' })
  user_one!: User

  @Field(() => User)
  @Column({ type: 'int' })
  user_two!: User

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.chat_session)
  messages: Message[]
}
