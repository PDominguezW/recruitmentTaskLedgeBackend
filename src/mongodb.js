// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import { MongoClient } from 'mongodb'
import { config } from 'dotenv';

config();

export const mongodb = async (app) => {
  const connection = process.env.DATABASE_URL
  const mongoClient = await MongoClient.connect(connection)

  app.set('mongodbClient', mongoClient)
}
