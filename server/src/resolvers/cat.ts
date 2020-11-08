import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'
import { getConnection } from 'typeorm'
import { CatResponse } from '../graphqlTypes/CatResponse'
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../utils/constants'
import { v4 } from 'uuid'
import { ExpressRedisContext } from '../tsTypes/ExpressRedisContext'
import { Cat } from '../entities/Cat'
import { CreateCatInput } from '../graphqlTypes/CreateCatInput'
import { isAuth } from '../middleware/isAuth'
import { User } from '../entities/User'
import { Pic } from '../entities/Pic'

@Resolver(Cat)
export class CatResolver {
  connection = getConnection()

  // ~ CREATE NEW CAT
  @Mutation(() => CatResponse)
  @UseMiddleware(isAuth) // guarded resolver
  async createCat(
    @Arg('options') options: CreateCatInput,
    @Ctx() { req, redis }: ExpressRedisContext
  ): Promise<CatResponse> {
    const user = await User.findOne(parseInt(req.session?.userId))
    if (!user) {
      return {
        errors: [
          {
            field: 'user',
            message: 'User could not be found',
          },
        ],
      }
    }

    let pics: Pic[] = []
    if (options.pics) {
      pics = await Pic.findByIds(options.pics)
    }

    let newCat
    try {
      newCat = new Cat()
      newCat.name = options.name
      newCat.breed = options.breed
      newCat.sex = options.sex
      newCat.age = options.age
      newCat.pics = pics
      newCat.owner = user
      await this.connection.manager.save(newCat)
    } catch (e) {
      return {
        errors: [
          {
            field: 'cat',
            message: 'There was an error creating that cat',
          },
        ],
      }
    }
    return { cat: newCat }
  }
}
