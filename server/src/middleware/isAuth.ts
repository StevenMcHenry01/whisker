import { ExpressRedisContext } from 'src/tsTypes/ExpressRedisContext'
import { MiddlewareFn } from 'type-graphql'

export const isAuth: MiddlewareFn<ExpressRedisContext> = ({ context }, next) => {
  if (!context.req.session?.userId) {
    throw new Error('not authenticated')
  }

  return next()
}
