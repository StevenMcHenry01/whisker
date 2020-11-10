import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'

@ObjectType() // can return
export class DislikeResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field({ nullable: true })
  success?: boolean
}
