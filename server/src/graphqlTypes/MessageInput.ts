import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class MessageInput {
  @Field()
  recieverId: number
  @Field()
  body: string
}
