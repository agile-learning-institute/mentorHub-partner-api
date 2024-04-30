import { MongoClient } from 'mongodb';
import Config from './Config';

const url = 'mongodb://localhost:27017';
const dbName = 'myDatabaseName';

const client = new MongoClient(url);

export default class MongoIO {
  constructor(cfg: Config) {
    const string = cfg.getConnectionString();
  }

  public async connect() {
    try {
      await client.connect();
      console.log("Connected successfully to database");
      return client.db(dbName);
    } catch (e) {
      console.error("Could not connect to database", e);
    }
  }
}
