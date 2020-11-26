import { ObjectType, Field } from 'type-graphql'
import { FieldError } from './FieldError'
import { Pic } from '../entities/Pic'

@ObjectType() // can return
export class PicResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => Pic, { nullable: true })
  pic?: Pic
}
