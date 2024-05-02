import { MongoClient, Db, Collection, InsertOneResult, IntegerType} from 'mongodb';
import { EJSON } from 'bson';
import Config from './Config';
import MongoInterface from '../interfaces/MongoInterface'
import { CollectionVersionWithId } from '../interfaces/CollectionVersion';
import { EnumeratorsWithId } from '../interfaces/Enumerators';

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

  public async loadVersions(): Promise<void> {
    if (!this.versionCollection) {
      throw new Error("loadVersions - Database not connected");
    }
    let versions: CollectionVersionWithId[];
    versions = await this.versionCollection.find({}).toArray() as Array<CollectionVersionWithId>;
    this.config.versions = versions;
  }

  public async loadEnumerators(collectionName: string): Promise<void> {
    if (!this.enumeratorsCollection) {
      throw new Error("loadEnumerators - Database not connected");
    }
    if (this.config.versions.length === 0) {
      throw new Error("loadEnumerators - Versions not loaded");
    }

    const theVersion = parseInt(this.config.versions
      .filter(version => version.collectionName === collectionName)
      .map(version => version.currentVersion.split('.').pop() || "0")
      .pop() || "0");
   
    let query = {"version": theVersion};
    let enumerations: EnumeratorsWithId;
    enumerations = await this.enumeratorsCollection.findOne(query) as EnumeratorsWithId;
    this.config.enumerators = enumerations.enumerators;
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