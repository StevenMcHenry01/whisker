import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { Match } from '../entities/Match'

@ObjectType() // can return
export class MatchesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => [Match], { nullable: true })
  matches?: Match[]
}
