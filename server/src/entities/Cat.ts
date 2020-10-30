// 3rd party imports

// my imports
import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Match } from './Match'
import { Pic } from './Pic'
import { User } from './User'

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

  @Field({ nullable: true })
  @Column()
  age: number

  @Field({ nullable: true })
  @Column()
  breed: string

  @Field({ nullable: true })
  @Column()
  sex!: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cats)
  owner!: User

  @ManyToMany(() => Cat)
  @JoinTable({
    name: 'cat_likes',
    joinColumn: {
      name: 'cat',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'likes',
      referencedColumnName: 'id',
    },
  })
  cat_likes: Cat[]

  @Field(()=>[Match])
  @OneToMany(()=>Match, (match) => match.cat)
  matches: Match[]

  @Field(()=>[Pic])
  @OneToMany(()=>Pic, (pic) => pic.cat)
  pics: Pic[]
}
