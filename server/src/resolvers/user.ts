import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { User } from '../entities/User'
import argon2 from 'argon2'
import { getConnection } from 'typeorm'
import { RegisterInput } from '../graphqlTypes/RegisterInput'
import { UserResponse } from '../graphqlTypes/UserResponse'
import { LoginInput } from '../graphqlTypes/LoginInput'
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../utils/constants'
import { v4 } from 'uuid'
import { sendEmail } from '../utils/sendEmail'
import { ExpressRedisContext } from '../tsTypes/ExpressRedisContext'
import { validateRegister } from './validators/validateRegister'
import { NewPasswordInput } from '../graphqlTypes/NewPasswordInput'
import { Cat } from '../entities/Cat'
import { CatResponse } from '../graphqlTypes/CatResponse'
import { isAuth } from '../middleware/isAuth'
import { MeResponse } from '../graphqlTypes/MeResponse'
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import mkdirp from 'mkdirp'
import { createWriteStream } from 'fs'
import { Pic } from '../entities/Pic'

@Resolver(User)
export class UserResolver {
  connection = getConnection()

  // ~ CHANGE PASSWORD
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('options') options: NewPasswordInput,
    @Ctx() { req, redis }: ExpressRedisContext
  ): Promise<UserResponse> {
    // check for password length
    if (options.newPassword.length <= 5) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'new password must be 6 characters',
          },
        ],
      }
    }

    // make sure the token is still in redis
    const userId = await redis.get(FORGOT_PASSWORD_PREFIX + options.token)
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired.',
          },
        ],
      }
    }

    const userIdParsed = parseInt(userId)

    // user sent good token so get user
    const user = await User.findOne(userIdParsed)

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists.',
          },
        ],
      }
    }

    // hash new password
    const hashedPassword = await argon2.hash(options.newPassword)

    // save updated user password in db
    User.update({ id: userIdParsed }, { password: hashedPassword })

    // deactivate key
    redis.del(FORGOT_PASSWORD_PREFIX + options.token)

    // log in user after changed password
    if (req.session) {
      req.session.userId = user.id
    }

    return { user }
  }

  // ~ FORGOT PASSWORD EMAIL SEND
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: ExpressRedisContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      // the email is not in the db but best not to let them know
      return true
    }

    // unique token for user email reset
    const token = v4()

    // store token in redis
    await redis.set(FORGOT_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 1) // one hour token

    const html = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`

    await sendEmail(email, html)

    return true
  }

  // ~ ME
  @Query(() => MeResponse, { nullable: true })
  async me(@Ctx() { req }: ExpressRedisContext): Promise<MeResponse | null> {
    // user is not logged in
    if (req.session) {
      if (!req.session.userId) {
        return null
      }
      // user is logged in and they have already selected a cat
      if (req.session.selectedCatId) {
        return {
          user: await User.findOne(req.session?.userId),
          selectedCat: await Cat.findOne(req.session.selectedCatId),
        }
      }
    }
    // user is logged in so return the user
    return { user: await User.findOne(req.session?.userId) }
  }

  // ~ REGISTER
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: RegisterInput,
    @Ctx() { req }: ExpressRedisContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options)
    if (errors) {
      return { errors }
    }

    const hashedPassword = await argon2.hash(options.password)
    let newUser
    try {
      newUser = new User()
      newUser.username = options.username
      newUser.email = options.email
      newUser.password = hashedPassword
      await this.connection.manager.save(newUser)
    } catch (e) {
      const errorMessage = 'Either the email or username already exists.'
      if (e.detail?.includes('already exists')) {
        return {
          errors: [
            { field: 'username', message: errorMessage },
            { field: 'email', message: errorMessage },
          ],
        }
      } else {
        return {
          errors: [
            {
              field: 'username',
              message: 'Error registering',
            },
          ],
        }
      }
    }

    // log in user after changed password
    if (req.session) {
      req.session.userId = newUser.id // s
    }

    return { user: newUser }
  }

  // ~ LOGIN
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: LoginInput,
    @Ctx() { req }: ExpressRedisContext
  ): Promise<UserResponse> {
    let user
    // search via username
    user = await User.findOne({ where: { username: options.emailOrUsername } })
    // search via email
    if (!user) {
      user = await User.findOne({
        where: { email: options.emailOrUsername },
      })
    }

    if (!user) {
      return {
        errors: [
          {
            field: 'emailOrUsername',
            message: 'that username or email does not exist',
          },
        ],
      }
    }
    const vaildatedPassword = await argon2.verify(user.password, options.password)
    if (!vaildatedPassword) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      }
    }

    // store userId in session in redis store
    if (req.session) {
      req.session.userId = user.id
    }

    return {
      user,
    }
  }

  // ~ LOGOUT
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: ExpressRedisContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session?.destroy((err) => {
        res.clearCookie(COOKIE_NAME) // clear frontend cookie
        if (err) {
          console.error(err)
          resolve(false)
          return
        }
        resolve(true)
      })
    )
  }

  // ~ CHOOSE CAT
  @Mutation(() => CatResponse)
  @UseMiddleware(isAuth) // guarded resolver
  async chooseCat(
    @Arg('id') id: number,
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

    let cat
    try {
      cat = await Cat.findOne(id, { where: { owner: user } })
    } catch (e) {
      return {
        errors: [
          {
            field: 'cat',
            message: 'could not find that cat for that user.\n Error message: ' + e.message,
          },
        ],
      }
    }

    // store userId in session in redis store
    if (req.session && cat) {
      req.session.selectedCatId = cat.id
    }

    return {
      cat,
    }
  }

  // ~ UPLOAD PHOTO
  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth) // guarded resolver
  async uploadUserPhoto(
    @Arg('file', () => GraphQLUpload) file: FileUpload,
    @Ctx() { s3 }: ExpressRedisContext
  ): Promise<boolean> {
    const user = await User.findOne(1)
    const { createReadStream, filename, mimetype } = await file

    const fileStream = createReadStream()

    try {
      if (user) {
        const uploadParams = {
          Bucket: 'whisker',
          Key: `${user.id}-${filename}`,
          Body: fileStream,
        }
        const result = await s3.upload(uploadParams).promise()
        const photo = new Pic()
        photo.url = result.Location
        photo.user = user
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
