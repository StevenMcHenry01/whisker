import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { Cat } from '../entities/Cat'

@ObjectType() // can return
export class CatsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => [Cat], { nullable: true })
  cats?: Cat[]
}
