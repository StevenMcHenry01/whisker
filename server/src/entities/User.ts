import { ObjectType, Field, Int } from 'type-graphql'
import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from 'typeorm'


@ObjectType()
@Entity()
// extend allows base sql commands link find() and insert()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date()

  @Field(() => String)
  @Column({ unique: true })
  username!: string

  @Field(() => String)
  @Column({ unique: true })
  email!: string

  // no field property so it cannot be accessed with gql query
  @Column()
  password!: string
}
