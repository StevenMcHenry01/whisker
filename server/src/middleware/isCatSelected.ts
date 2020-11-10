import { ExpressRedisContext } from 'src/tsTypes/ExpressRedisContext'
import { MiddlewareFn } from 'type-graphql'

export const isCatSelected: MiddlewareFn<ExpressRedisContext> = ({ context }, next) => {
  if (!context.req.session?.selectedCatId) {
    throw new Error('no cat selected')
  }

  return next()
}
