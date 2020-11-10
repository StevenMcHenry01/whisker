import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class EditCatInput {
  @Field()
  id: number
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  age: number
  @Field({ nullable: true })
  breed: string
  @Field({ nullable: true })
  sex: string
  @Field(() => [Int], { nullable: true })
  pics: number[]
}
