import { User } from "../entities/User"
import { ObjectType, Field } from "type-graphql"
import { FieldError } from "./FieldError"

@ObjectType() // can return
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
  @Field(() => User, { nullable: true })
  user?: User
}