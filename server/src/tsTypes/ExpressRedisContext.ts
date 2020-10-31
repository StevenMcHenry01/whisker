import { Request, Response } from 'express'
import { Redis } from 'ioredis'

export type ExpressRedisContext = {
  req: Request
  res: Response
  redis: Redis
}
