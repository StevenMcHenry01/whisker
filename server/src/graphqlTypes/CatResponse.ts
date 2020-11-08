import { User } from '../entities/User'
import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { Cat } from '../entities/Cat'

@ObjectType() // can return
export class CatResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => Cat, { nullable: true })
  cat?: Cat
}
