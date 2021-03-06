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
  UpdateDateColumn,
} from 'typeorm'
import { Cat } from './Cat'
import { ChatSession } from './ChatSession'

@ObjectType()
@Entity()
// extend allows base sql commands link find() and insert()
export class Message extends BaseEntity {
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
  body!: string

  @Field()
  @Column()
  senderId!: number

  @Field(() => ChatSession)
  @ManyToOne(() => ChatSession, (chatSession) => chatSession.messages, {
    onDelete: 'CASCADE',
  })
  chatSession: ChatSession
}
