import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../entities/User'
import argon2 from 'argon2'
import { getConnection } from 'typeorm'
import { RegisterInput } from '../graphqlTypes/RegisterInput'
import { UserResponse } from '../graphqlTypes/UserResponse'
import { LoginInput } from '../graphqlTypes/LoginInput'

@Resolver(User)
export class UserResolver {
  connection = getConnection()

  // // ~ CHANGE PASSWORD
  // @Mutation(() => UserResponse)
  // async changePassword(
  //   @Arg('token') token: string,
  //   @Arg('newPassword') newPassword: string,
  //   @Ctx() { redis, req }: MyContext
  // ): Promise<UserResponse> {
  //   // check for password length
  //   if (newPassword.length <= 5) {
  //     return {
  //       errors: [
  //         {
  //           field: 'newPassword',
  //           message: 'new password must be longer than 5 characters',
  //         },
  //       ],
  //     }
  //   }

  //   const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token)
  //   if (!userId) {
  //     return {
  //       errors: [
  //         {
  //           field: 'token',
  //           message: 'token expired.',
  //         },
  //       ],
  //     }
  //   }

  //   const userIdParsed = parseInt(userId)

  //   // user sent good token so get user
  //   const user = await User.findOne(userIdParsed)

  //   if (!user) {
  //     return {
  //       errors: [
  //         {
  //           field: 'token',
  //           message: 'user no longer exists.',
  //         },
  //       ],
  //     }
  //   }

  //   // hash new password
  //   const hashedPassword = await argon2.hash(newPassword)

  //   // save updated user password in db
  //   User.update({ id: userIdParsed }, { password: hashedPassword })

  //   // deactivate key
  //   redis.del(FORGOT_PASSWORD_PREFIX + token)

  //   // log in user after changed password
  //   if (req && req.session) {
  //     req.session.userId = user.id
  //   }

  //   return { user }
  // }

  // // ~ FORGOT PASSWORD EMAIL SEND
  // @Mutation(() => Boolean)
  // async forgotPassword(
  //   @Arg('email') email: string,
  //   @Ctx() { redis }: MyContext
  // ) {
  //   const user = await User.findOne({ where: { email } })
  //   if (!user) {
  //     // the email is not in the db but best not to let them know
  //     return true
  //   }

  //   // unique token for user email reset
  //   const token = v4()

  //   // store token in redis
  //   await redis.set(
  //     FORGOT_PASSWORD_PREFIX + token,
  //     user.id,
  //     'ex',
  //     1000 * 60 * 60 * 24 * 3
  //   ) // three day token

  //   const html = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`

  //   await sendEmail(email, html)

  //   return true
  // }

  // ~ ME
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: any) {
    // user is not logged in
    if (!req.session!.userId) {
      return null
    }

    // user is logged in so return the user
    return User.findOne(req.session?.userId)
  }

  // ~ REGISTER
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: RegisterInput,
    @Ctx() { req }: any
  ): Promise<UserResponse> {
    // const errors = validateRegister(options)
    // if (errors) {
    //   return { errors }
    // }

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
    return { user: newUser }
  }

  // ~ LOGIN
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: LoginInput,
    @Ctx() { req }: any
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
    const vaildatedPassword = await argon2.verify(
      user.password,
      options.password
    )
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
    req.session!.userId = user.id

    return {
      user,
    }
  }

  // // ~ LOGOUT
  // @Mutation(() => Boolean)
  // logout(@Ctx() { req, res }: MyContext) {
  //   return new Promise((resolve) =>
  //     req.session?.destroy((err) => {
  //       res.clearCookie(COOKIE_NAME) // clear frontend cookie
  //       if (err) {
  //         console.error(err)
  //         resolve(false)
  //         return
  //       }
  //       resolve(true)
  //     })
  //   )
  // }
}
