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
  @Field({ nullable: true })
  bio: string
  @Field({ nullable: true })
  latitude: number
  @Field({ nullable: true })
  longitude: number
  @Field(() => [Int], { nullable: true })
  photoIds: [number]
}
