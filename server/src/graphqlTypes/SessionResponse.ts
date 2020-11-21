import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { ChatSession } from '../entities/ChatSession'
import { Message } from '../entities/Message'

@ObjectType() // can return
export class SessionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => ChatSession, { nullable: true })
  chatSession?: ChatSession
}
