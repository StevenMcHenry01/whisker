import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { Cat } from '../entities/Cat'

@ObjectType() // can return
export class LikeResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => Cat, { nullable: true })
  match?: Cat
  @Field({ nullable: true })
  success?: boolean
}
