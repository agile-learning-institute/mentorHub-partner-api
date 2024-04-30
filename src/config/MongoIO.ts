import { MongoClient, Db, Collection } from 'mongodb';
import { EJSON } from 'bson';
import Config from './Config';

/**
 * Class MongoIO implementes all mongodb I-O.
 */
export default class MongoIO {
  private config: Config;
  private client?: MongoClient;
  private db?: Db;
  private msmVersionCollection = "msmCurrentVersions";
  private partnerCollection = "partners";

  /**
   * Constructor gets configuration values, loads the enumerators, and logs completion
   */
  constructor(config: Config) {
    this.config = config;
  }

  /**
  * Connect to the Mongo Database
  */
  public async connect(): Promise<void> {
    const connectionString = this.config.getConnectionString();
    const dbName = this.config.getDbName();

    this.client = new MongoClient(connectionString);
    await this.client.connect();
    this.db = this.client.db(dbName);

    console.info("Database", dbName, "Connected");
  }

  /**
   * Disconnect from the database
   */
  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = undefined;
      this.db = undefined;
    }
  }

  public async Aggregate(): Promise<void> {
  }

  public async Find(): Promise<void> {
  }

  public async FindOne(): Promise<void> {
  }

  public async InsertOne(): Promise<void> {
  }

  public async UpdateOne(): Promise<void> {
  }

  public GetPartnerCollection(): Collection {
    if (!this.db) {
      throw new Error("Database not connected");
    }
    return this.db.collection(this.config.getPartnerCollectionName());
  }
}