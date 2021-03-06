// 3rd party imports
import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
import express from 'express'
import { buildSchema } from 'type-graphql'
import session, { SessionOptions } from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import { createNewConnection } from './config/connectTypeorm'
import { redis, sessionConfig } from './config/sessionAndRedisConfig'
import { UserResolver } from './resolvers/user'
import { CatResolver } from './resolvers/cat'
import { MessageResolver } from './resolvers/messaging'
import { graphqlUploadExpress } from 'graphql-upload'

// my imports

const main = async () => {
  createNewConnection()

  const app = express()

  // needed for nginx proxy and cookies
  app.set('trust proxy', 1)

  // ~ CORS
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  )

  // ~ Test endpoint
  app.get('/', (req, res) => {
    res.send('Hello from api')
  })

  // ~ Image upload middleware
  app.use('/graphql', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  // ~ Redis setup
  app.use(session(sessionConfig as SessionOptions))

  // ~ Apollo server setup (used to create graphql middleware for app)
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, CatResolver, MessageResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }), // allows to use session throughout app
    uploads: false,
  })

  apolloServer.applyMiddleware({ app, cors: false }) // cors is false due to setting up in express

  // ~ LAUNCH
  app.listen(process.env.PORT, () => {
    console.log(`server started on http://localhost:${process.env.PORT}`)
  })
}

main().catch((err) => {
  console.error(err)
})
