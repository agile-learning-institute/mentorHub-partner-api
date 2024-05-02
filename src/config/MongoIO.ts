import { MongoClient, Db, Collection, InsertOneResult, IntegerType} from 'mongodb';
import { EJSON } from 'bson';
import Config from './Config';
import MongoInterface from '../interfaces/MongoInterface'

/**
 * Class MongoIO implementes all mongodb I-O.
 */
export default class MongoIO  implements MongoInterface {
  private config: Config;
  private client?: MongoClient;
  private db?: Db;
  private peopleCollection?: Collection;
  private partnerCollection?: Collection;
  private versionCollection?: Collection;
  private enumeratorsCollection?: Collection;

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
    this.versionCollection = this.db.collection(this.config.getVersionCollectionName());
    this.enumeratorsCollection = this.db.collection(this.config.getenumeratorsCollectionName());

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

  public async aggregate(collection: Collection, pipeline: any[]): Promise<any> {
  }

  public async find(collection: Collection, query: any): Promise<any[]> {
    return [];
  }

  public async findOne(collection: Collection, query: any): Promise<Document> {
    return new Document();
  }

  public async addOne(collection: Collection, doc: any): Promise<any> {
  }

  public async updateOne(collection: Collection, query: any, update: any): Promise<Document> {
    return new Document();
  }

  public async loadVersions(): Promise<void> {
  }

  public async loadEnumerators(version: IntegerType): Promise<void> {
  }

  public getPartnerCollection(): Collection {
    if (!this.partnerCollection) {
      throw new Error("GetPartnerCollection - Database not connected");
    }
    return this.partnerCollection;
  }

  public getPeopleCollection(): Collection {
    if (!this.peopleCollection) {
      throw new Error("GetPeopleCollection - Database not connected");
    }
    return this.peopleCollection;
  }

  public getVersionCollection(): Collection {
    if (!this.versionCollection) {
      throw new Error("GetVersionCollection - Database not connected");
    }
    return this.versionCollection;
  }

  public getEnumeratorsCollection(): Collection {
    if (!this.enumeratorsCollection) {
      throw new Error("getEnumeratorsCollection - Database not connected");
    }
    return this.enumeratorsCollection;
  }
}