import { MongoClient, Db, Collection, InsertOneResult, IntegerType, ObjectId } from 'mongodb';
import config from './Config';

/********************************************************************************
 * Class Properties
 ********************************************************************************/
export default class MongoIO {
  private client?: MongoClient;

  /********************************************************************************
   * Constructor (no-op)
   ********************************************************************************/
  constructor() {
  }

  /********************************************************************************
   * Connect to the Mongo Database, 
   * Initialize config (versions, enumerators)
   */
  public async connect(primaryCollection: string): Promise<void> {
    const connectionString = config.MONGO_CONNECTION_STRING;

    this.client = new MongoClient(connectionString);
    await this.client.connect();

    await this.loadVersions();
    await this.loadEnumerators(primaryCollection);
    console.info("Database Connected");
  }

  /********************************************************************************
   * Disconnect from the database
   */
  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }

  /********************************************************************************
   * Get a list of documents with optional ordering
   * @param collectionName - Name of the MongoDB collection
   * @param match - MongoDB filter to match documents
   * @param project - MongoDB projection to specify returned fields
   * @param orderBy - MongoDB sort order
   * @returns Array of documents
   ********************************************************************************/
  public async getDocuments(collectionName: string, match: Record<string, any> = {}, project: Record<string, any> = {}, sort: Record<string, any> = {}): Promise<any[]> {
    if (!this.client) throw new Error("Database not connected");

    const db = this.client.db(config.MONGO_DB_NAME);
    const collection = db.collection(collectionName);

    // Construct query options
    const options: { projection?: Record<string, any>; sort?: Record<string, any> } = {};
    if (Object.keys(project).length > 0) options.projection = project;
    if (Object.keys(sort).length > 0) options.sort = sort;

    // Query the database
    const results = await collection.find(match, options).toArray();
    return results;
  }  

/********************************************************************************
 * Get a Document by ID
 * @param collectionName - Name of the MongoDB collection
 * @param id - The document's ID (string representation of ObjectId)
 * @returns The document if found, or null if not found
 ********************************************************************************/
public async getDocument(collectionName: string, id: string): Promise<any> {
    if (!this.client) throw new Error("getDocument - Database not connected");

    const db = this.client.db(config.MONGO_DB_NAME);
    const collection = db.collection(collectionName);
    const match = {"_id": new ObjectId(id)};
    const results = await collection.findOne(match);
    return results;
  }

  /********************************************************************************
   * Insert a new Document
   * @param collectionName - Name of the MongoDB collection
   * @param document - The document to insert
   * @returns The inserted document with its `_id`
   ********************************************************************************/
  public async insertDocument(collectionName: string, document: Record<string, any>): Promise<any> {
    if (!this.client) throw new Error("insertDocument - Database not connected");

    const db = this.client.db(config.MONGO_DB_NAME);
    const collection = db.collection(collectionName);

    // Insert the document into the collection
    const result = await collection.insertOne(document);
    return await this.getDocument(collectionName, result.insertedId.toHexString());
  }

  /********************************************************************************
   * Update a Document
   * @param collectionName - Name of the MongoDB collection
   * @param id - Id of the document to be updated
   * @param updates - The updates to apply
   * @returns The updated document 
   ********************************************************************************/
  public async updateDocument(collectionName: string, id: string, updates: Record<string, any>): Promise<any> {
    if (!this.client) throw new Error("updateDocument - Database not connected");

    const db = this.client.db(config.MONGO_DB_NAME);
    const collection = db.collection(collectionName);
    const filter = { _id: new ObjectId(id) };
    const update = { $set: updates };
    const result = await collection.findOneAndUpdate(filter, update, { returnDocument: "after" });
    return result;
  }

  /********************************************************************************
   * Delete a Document
   * @param collectionName - Name of the MongoDB collection
   * @param id - Id of the document to be updated
   * @returns The deleted document if found, or null if no document was deleted
   ********************************************************************************/
  public async deleteDocument(collectionName: string, id: string): Promise<any> {
    if (!this.client) throw new Error("deleteDocument - Database not connected");

    const db = this.client.db(config.MONGO_DB_NAME);
    const collection = db.collection(collectionName);
    const match = { _id: new ObjectId(id) };
    const result = await collection.findOneAndDelete(match);
    return result;
  }

  /********************************************************************************
   * Load the collection Versions array into the config
   * @returns void
   ********************************************************************************/
  public async loadVersions(): Promise<void> {
    if (!this.client) throw new Error("Database not connected");

    const project = { _id: 0 }; 
    const versions = await this.getDocuments(config.VERSION_COLLECTION_NAME, {}, project, {});

    // Update the config with the retrieved versions
    if (!Array.isArray(versions)) throw new Error("Failed to load versions: Expected an array of documents");

    config.versions = versions;
    console.info("Versions Loaded:", versions.length);
  }

  /********************************************************************************
   * Load the Enumerators based on a Collection Version
   * @param primaryCollectionName - Name of the collection to use
   * @returns void
   ********************************************************************************/
  public async loadEnumerators(primaryCollectionName: string): Promise<void> {
    if (!this.client) throw new Error("Database not connected");
    if (config.versions.length === 0) throw new Error("Versions not loaded");

    // Get the current version string for the specified collection
    const versionString = config.versions
        .filter(version => version.collectionName === primaryCollectionName)
        .map(version => version.currentVersion.split('.').pop() || "0")
        .pop() || "0";
    const version = parseInt(versionString, 10);

    // Query to retrieve the enumerators
    const match = { version: version };
    const enumerators = await this.getDocuments(config.ENUMERATORS_COLLECTION_NAME, match, {}, {});

    // Validate the result and ensure enumerators are found
    if (!enumerators || enumerators.length === 0) {
        throw new Error(`Enumerators not found for collection: ${primaryCollectionName}, version: ${versionString}`);
    }

    config.enumerators = enumerators[0].enumerators || [];
    console.info(`Enumerators loaded for collection: ${primaryCollectionName}, version: ${versionString}`);
  }
}