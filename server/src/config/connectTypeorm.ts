import { createConnection, Connection } from 'typeorm'

export const createNewConnection = async () => {
  const connection = await createConnection({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: ['dist/entities/*.js'],
  })
  console.log(
    connection.isConnected
      ? 'successfully connected to database!'
      : 'failed to connect to database.'
  )
}
