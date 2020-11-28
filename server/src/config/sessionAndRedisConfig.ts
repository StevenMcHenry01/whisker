import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import session from 'express-session'
import { COOKIE_NAME, __prod__ } from '../utils/constants'

const RedisStore = connectRedis(session)
export const redis = new Redis(process.env.REDIS_URL)

export const sessionConfig = {
  name: COOKIE_NAME, // what will show up in browser
  store: new RedisStore({
    client: redis, // telling express session we are using redis
    disableTouch: true, // Tells redis to keep session alive until we say otherwise
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 year cookie 💃
    httpOnly: true, // cannot access cookie via frontend js
    secure: __prod__, // only works with https
    sameSite: 'lax', // csrf
    domain: __prod__ ? '.whisker.live' : undefined,
  },
  saveUninitialized: false,
  secret: process.env.SESSSION_SECRET as string,
  resave: false,
}
