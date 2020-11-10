import { ObjectType, Field, Int } from 'type-graphql'
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { Cat } from './Cat'
import { Message } from './Message'

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

  @Field()
  @Column()
  catOneId!: number

  @Field()
  @Column()
  catTwoId!: number

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.chatSession, { eager: true })
  messages: Message[]
}
