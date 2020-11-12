import { Request, Response } from 'express'
import { Redis } from 'ioredis'
import AWS from 'aws-sdk'

export type ExpressRedisContext = {
  req: Request
  res: Response
  redis: Redis
  s3: AWS.S3
}
