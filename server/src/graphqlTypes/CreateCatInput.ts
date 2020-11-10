import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class CreateCatInput {
  @Field()
  name: string
  @Field({ nullable: true })
  age: number
  @Field({ nullable: true })
  breed: string
  @Field()
  sex: string
  @Field(() => [Int], { nullable: true })
  pics: number[]
}
