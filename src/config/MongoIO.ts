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
  private peopleCollection?: Collection;
  private partnerCollection?: Collection;
  private versionCollection?: Collection;

  /**
   * Constructor gets configuration values
   */
  constructor(config: Config) {
    this.config = config;
  }

  /**
  * Connect to the Mongo Database, initilize
  * connection related objects, and load versions 
  * and enumerators
  */
  public async connect(): Promise<void> {
    const connectionString = this.config.getConnectionString();
    const dbName = this.config.getDbName();

    this.client = new MongoClient(connectionString);
    await this.client.connect();
    this.db = this.client.db(dbName);
    this.peopleCollection = this.db.collection(this.config.getPeopleCollectionName());
    this.partnerCollection = this.db.collection(this.config.getPartnerCollectionName());
    this.versionCollection = this.db.collection(this.config.getMsmVersionCollection());

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

  public async LoadVersions(): Promise<void> {
  }

  public async LoadEnumerators(): Promise<void> {
  }

  public GetPartnerCollection(): Collection {
    if (!this.partnerCollection) {
      throw new Error("GetPartnerCollection - Database not connected");
    }
    return this.partnerCollection;
  }

  public GetPeopleCollection(): Collection {
    if (!this.peopleCollection) {
      throw new Error("GetPeopleCollection - Database not connected");
    }
    return this.peopleCollection;
  }

  public GetVersionCollection(): Collection {
    if (!this.versionCollection) {
      throw new Error("GetVersionCollection - Database not connected");
    }
    return this.versionCollection;
  }
}