// 3rd party imports

// my imports
import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ChatSession } from './ChatSession'
import { Dislike } from './Dislike'
import { Like } from './Like'
import { Match } from './Match'
import { Pic } from './Pic'
import { User } from './User'
import { Viewed } from './Viewed'

@ObjectType()
@Entity()
// extend allows base sql commands link find() and insert()
export class Cat extends BaseEntity {
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
  @Column()
  name!: string

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  age: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  breed: string

  @Field({ nullable: true })
  @Column()
  sex!: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cats, { eager: true })
  owner!: User

  @Field(() => [Match])
  @OneToMany(() => Match, (match) => match.cat)
  matches: Match[]

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.likerCat)
  likes: Like[]

  @Field(() => [Dislike])
  @OneToMany(() => Dislike, (dislike) => dislike.dislikerCat)
  dislikes: Dislike[]

  @Field(() => [Viewed])
  @OneToMany(() => Viewed, (viewed) => viewed.viewerCat)
  viewed: Viewed[]

  @Field(() => [Pic])
  @OneToMany(() => Pic, (pic) => pic.cat, { eager: true })
  pics: Pic[]
}
