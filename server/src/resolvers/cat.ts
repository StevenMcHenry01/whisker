// 3rd party imports
import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { Any, getConnection, In, Not } from 'typeorm'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

// my imports
import { CatResponse } from '../graphqlTypes/CatResponse'
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
import { MatchesResponse } from '../graphqlTypes/MatchesResponse'
import { cloudinary } from '../utils/cloudinary'
import { validateCat } from '../validators/validateCat'
import { validateEditCat } from '../validators/validateEditCat'
import { PicResponse } from '../graphqlTypes/PicResponse'
import { IoTThingsGraph } from 'aws-sdk'
import { UploadStream } from 'cloudinary'
import { ReadStream } from 'typeorm/platform/PlatformTools'
import { createReadStream } from 'fs'
import { uploadToCloudinary } from '../utils/streamUpload'

@Resolver(Cat)
export class CatResolver {
  connection = getConnection()

  // ~ CREATE NEW CAT
  @Mutation(() => CatResponse)
  @UseMiddleware(isAuth) // guarded resolver
  async createCat(
    @Arg('options') options: CreateCatInput,
    @Ctx() { req }: ExpressRedisContext
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

    const pics = await Pic.find({ id: Any(options.photoIds) })

    const errors = validateCat(options)
    if (errors) {
      return { errors }
    }

    let newCat
    try {
      newCat = new Cat()
      newCat.name = options.name
      newCat.breed = options.breed
      newCat.bio = options.bio
      newCat.sex = options.sex
      newCat.age = options.age
      newCat.owner = user
      newCat.pics = pics
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
  async getCats(@Arg('id', { nullable: true }) id?: number): Promise<CatsResponse> {
    if (id) {
      const cat = await Cat.findOne(id)
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

  // ~ GET CAT BY ID
  @Query(() => CatResponse)
  async getCat(@Arg('id') id: number): Promise<CatResponse> {
    const cat = await Cat.findOne(id)
    if (!cat) {
      return {
        errors: [
          {
            field: 'cat',
            message: 'could not find cat with id: ' + id,
          },
        ],
      }
    }
    return { cat }
  }

  // ~ EDIT CAT
  @Mutation(() => CatResponse)
  @UseMiddleware(isAuth) // guarded resolver
  async editCat(@Arg('options') options: EditCatInput): Promise<CatResponse> {
    const errors = validateEditCat(options)
    if (errors) {
      return { errors }
    }

    let updatedCat
    try {
      await Cat.update(
        { id: options.id },
        { name: options.name, age: options.age, breed: options.breed, bio: options.bio }
      )
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
  async deleteCat(@Arg('id') id: number): Promise<boolean> {
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
  async likeCat(@Arg('id') id: number, @Ctx() { req }: ExpressRedisContext): Promise<LikeResponse> {
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
          // create chat session for both cats
          const chatSession = new ChatSession()
          chatSession.catOneId = likerCat.id
          chatSession.catTwoId = likedCat.id
          const newChat = await this.connection.manager.save(chatSession)

          // create a match for both cats
          const matchForLiker = new Match()
          matchForLiker.matchCatId = likedCat.id
          matchForLiker.cat = likerCat
          matchForLiker.chatSessionId = newChat.id
          this.connection.manager.save(matchForLiker)

          const matchForLiked = new Match()
          matchForLiked.matchCatId = likerCat.id
          matchForLiked.cat = likedCat
          matchForLiked.chatSessionId = newChat.id
          this.connection.manager.save(matchForLiked)

          // save view for matched, liked cat
          const viewed = new Viewed()
          viewed.viewerCat = likedCat
          viewed.viewedId = likerCat.id
          this.connection.manager.save(viewed)

          this.connection.manager.save(chatSession)

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
    @Ctx() { req }: ExpressRedisContext
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
  @Mutation(() => PicResponse)
  @UseMiddleware(isAuth)
  async uploadCatPhoto(@Arg('file', () => GraphQLUpload) file: FileUpload): Promise<PicResponse> {
    const uploadedFile = await uploadToCloudinary(file)
    if (uploadedFile) {
      const pic = new Pic()
      pic.url = uploadedFile.secure_url
      const createdPic = await this.connection.manager.save(pic)
      return {
        pic: createdPic,
      }
    } else {
      return {
        errors: [
          {
            field: 'pic',
            message: 'Error uploading picture.',
          },
        ],
      }
    }
  }

  // ~ GET MATCHES
  @Query(() => MatchesResponse)
  @UseMiddleware(isAuth) // guarded resolver
  @UseMiddleware(isCatSelected) // guarded resolver
  async getMatches(@Ctx() { req }: ExpressRedisContext): Promise<MatchesResponse> {
    const cat = await Cat.findOne(parseInt(req.session?.selectedCatId))

    const matches = await Match.find({ where: { cat: cat } })

    if (matches) {
      return { matches }
    }
    return {
      errors: [
        {
          field: 'matches',
          message: 'There was an error getting matches.',
        },
      ],
    }
  }
}
