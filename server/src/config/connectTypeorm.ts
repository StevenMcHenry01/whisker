import { createConnection } from 'typeorm'

export const createNewConnection = async () => {
  const connection = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // dropSchema: true,
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
