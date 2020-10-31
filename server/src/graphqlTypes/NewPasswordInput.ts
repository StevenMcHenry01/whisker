import { Field, InputType } from 'type-graphql'

@InputType()
export class NewPasswordInput {
  @Field()
  token: string
  @Field()
  newPassword: string
}
