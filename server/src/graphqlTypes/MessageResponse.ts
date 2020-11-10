import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { Cat } from '../entities/Cat'
import { ChatSession } from '../entities/ChatSession'

@ObjectType() // can return
export class MessageResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => ChatSession, { nullable: true })
  chatSession?: ChatSession
}
