import { ObjectType, Field, Int, InputType } from 'type-graphql'
import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { Cat } from './Cat'
import { Pic } from './Pic'

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

  @Field()
  @Column({ unique: true })
  username!: string

  @Field()
  @Column({ unique: true })
  email!: string

  // no field property so it cannot be accessed with gql query
  @Column()
  password!: string

  @Field(() => [Cat])
  @OneToMany(() => Cat, (cat) => cat.owner)
  cats: Cat[]

  @Field(() => [Pic])
  @OneToMany(() => Pic, (pic) => pic.user)
  pics: Pic[]
}
