import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class MessageInput {
  @Field()
  receiverId: number
  @Field()
  body: string
}
