import { User } from '../entities/User'
import { ObjectType, Field } from 'type-graphql'
import { Cat } from '../entities/Cat'

@ObjectType() // can return
export class MeResponse {
  @Field(() => User, { nullable: true })
  user?: User
  @Field(() => Cat, { nullable: true })
  selectedCat?: Cat
}
