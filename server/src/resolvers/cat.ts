import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'
import { getConnection, In, Not } from 'typeorm'
import { CatResponse } from '../graphqlTypes/CatResponse'
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../utils/constants'
import { v4 } from 'uuid'
import { ExpressRedisContext } from '../tsTypes/ExpressRedisContext'
import { Cat } from '../entities/Cat'
import { CreateCatInput } from '../graphqlTypes/CreateCatInput'
import { isAuth } from '../middleware/isAuth'
import { User } from '../entities/User'
import { Pic } from '../entities/Pic'
import { EditCatInput } from '../graphqlTypes/EditCatInput'
import { CatsResponse } from '../graphqlTypes/CatsResponse'
import { isCatSelected } from '../middleware/isCatSelected'
import { Like } from '../entities/Like'
import { Match } from '../entities/Match'
import { LikeResponse } from '../graphqlTypes/LikeResponse'
import { Dislike } from '../entities/Dislike'
import { Viewed } from '../entities/Viewed'
import { DislikeResponse } from '../graphqlTypes/LikeResponse copy'
import { ChatSession } from '../entities/ChatSession'
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'
import mkdirp from 'mkdirp'

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

    let newCat
    try {
      newCat = new Cat()
      newCat.name = options.name
      newCat.breed = options.breed
      newCat.sex = options.sex
      newCat.age = options.age
      newCat.owner = user
      await this.connection.manager.save(newCat)
    } catch (e) {
      return {
        errors: [
          {
            field: 'cat',
            message: 'There was an error creating that cat.\nError Message: ' + e.message,
          },
        ],
      }
    }

    // save cat as viewing itself (stops it from showing up when searching cats)
    const viewed = new Viewed()
    viewed.viewerCat = newCat
    viewed.viewedId = newCat.id
    this.connection.manager.save(viewed)

    return { cat: newCat }
  }

  // ~ GET ALL CATS OR UNVIEWED CATS
  @Query(() => CatsResponse)
  async getCats(
    @Ctx() { req, redis }: ExpressRedisContext,
    @Arg('id', { nullable: true }) id?: number
  ): Promise<CatsResponse> {
    if (id) {
      const cat = await Cat.findOne(id)
      console.log(cat)
      const viewed = await Viewed.find({
        where: {
          viewerCat: cat,
        },
      })
      if (viewed.length === 0) {
        return { cats: await Cat.find() }
      }
      const cats = await Cat.find({
        where: {
          id: Not(In(viewed.map((v) => v.viewedId))),
        },
      })
      return { cats }
    }

    const cats = await Cat.find()
    if (cats) {
      return { cats }
    }
    return {
      errors: [
        {
          field: 'cats',
          message: 'There was an error getting cats.',
        },
      ],
    }
  }

  // ~ EDIT CAT
  @Mutation(() => CatResponse)
  @UseMiddleware(isAuth) // guarded resolver
  async editCat(
    @Arg('options') options: EditCatInput,
    @Ctx() { req, redis }: ExpressRedisContext
  ): Promise<CatResponse> {
    let updatedCat
    try {
      await Cat.update({ id: options.id }, { name: options.name })
      updatedCat = await Cat.findOne(options.id)
    } catch (e) {
      return {
        errors: [
          {
            field: 'cat',
            message: 'There was an error updating that cat.\nError Message: ' + e.message,
          },
        ],
      }
    }
    return { cat: updatedCat }
  }

  // ~ DELETE CAT
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth) // guarded resolver
  async deleteCat(
    @Arg('id') id: number,
    @Ctx() { req, redis }: ExpressRedisContext
  ): Promise<boolean> {
    try {
      await Cat.delete({ id })
    } catch (e) {
      console.error(e.message)
      return false
    }
    return true
  }

  // ~ LIKE CAT
  @Mutation(() => LikeResponse)
  @UseMiddleware(isAuth) // guarded resolver
  @UseMiddleware(isCatSelected) // guarded resolver
  async likeCat(
    @Arg('id') id: number,
    @Ctx() { req, redis }: ExpressRedisContext
  ): Promise<LikeResponse> {
    const likerCat = await Cat.findOne(parseInt(req.session?.selectedCatId))
    const likedCat = await Cat.findOne(id)
    if (likerCat && likedCat) {
      try {
        // save like
        const like = new Like()
        like.likerCat = likerCat
        like.likesId = id
        await this.connection.manager.save(like)

        // save view
        const viewed = new Viewed()
        viewed.viewerCat = likerCat
        viewed.viewedId = id
        this.connection.manager.save(viewed)

        // check if liked cat has liked liker for a match
        const matched = await Like.findOne({
          where: {
            likerCat: likedCat,
            likesId: likerCat.id,
          },
        })
        // match was found! awww
        if (matched) {
          // create a match for both cats
          const matchForLiker = new Match()
          matchForLiker.match = likedCat
          matchForLiker.cat = likerCat
          this.connection.manager.save(matchForLiker)

          const matchForLiked = new Match()
          matchForLiked.match = likerCat
          matchForLiked.cat = likedCat
          this.connection.manager.save(matchForLiked)

          // create chat session for both cats
          const chatSession = new ChatSession()
          chatSession.catOneId = likerCat.id
          chatSession.catTwoId = likedCat.id
          this.connection.manager.save(chatSession)

          // save view for matched, liked cat
          const viewed = new Viewed()
          viewed.viewerCat = likedCat
          viewed.viewedId = likerCat.id
          this.connection.manager.save(viewed)

          // return the matched cat for displaying
          return {
            match: likedCat,
          }
        }
      } catch (e) {
        return {
          errors: [
            {
              field: 'like',
              message: 'Error liking the cat.\n Error message: ' + e.message,
            },
          ],
        }
      }
    } else {
      // cat was not liked
      return {
        success: false,
      }
    }
    // cat was successfully liked but no match
    return {
      success: true,
    }
  }

  // ~ DISLIKE CAT
  @Mutation(() => DislikeResponse)
  @UseMiddleware(isAuth) // guarded resolver
  @UseMiddleware(isCatSelected) // guarded resolver
  async dislikeCat(
    @Arg('id') id: number,
    @Ctx() { req, redis }: ExpressRedisContext
  ): Promise<DislikeResponse> {
    const dislikerCat = await Cat.findOne(parseInt(req.session?.selectedCatId))
    const dislikedCat = await Cat.findOne(id)
    if (dislikerCat && dislikedCat) {
      try {
        // save dislike
        const dislike = new Dislike()
        dislike.dislikerCat = dislikerCat
        dislike.dislikesId = id
        this.connection.manager.save(dislike)

        // save view
        const viewed = new Viewed()
        viewed.viewerCat = dislikerCat
        viewed.viewedId = id
        this.connection.manager.save(viewed)
      } catch (e) {
        return {
          errors: [
            {
              field: 'dislike',
              message: 'Error disliking the cat.\n Error message: ' + e.message,
            },
          ],
        }
      }
    } else {
      // cat was not disliked (maybe couldnt fine either?)
      return {
        success: false,
      }
    }
    // cat was successfully disliked
    return {
      success: true,
    }
  }

  // ~ UPLOAD PHOTO
  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth) // guarded resolver
  async uploadCatPhoto(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { s3 }: ExpressRedisContext
  ): Promise<boolean> {
    const cat = await Cat.findOne(1)
    const { createReadStream, filename, mimetype } = await file

    const fileStream = createReadStream()

    try {
      if (cat) {
        const uploadParams = {
          Bucket: 'whisker',
          Key: `${cat.id}-${filename}`,
          Body: fileStream,
        }
        const result = await s3.upload(uploadParams).promise()
        const photo = new Pic()
        photo.url = result.Location
        photo.cat = cat
        await this.connection.manager.save(photo)
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}
