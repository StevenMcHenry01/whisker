import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { Message } from '../entities/Message'

@ObjectType() // can return
export class MessageResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => Message, { nullable: true })
  message?: Message
}
