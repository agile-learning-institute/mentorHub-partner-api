import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'myDatabaseName';

const client = new MongoClient(url);

export async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to database");
    return client.db(dbName);
  } catch (e) {
    console.error("Could not connect to database", e);
  }
}
