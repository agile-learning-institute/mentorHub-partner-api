/********************************************************************************
* Class MongoIO implementes all mongodb I-O.
*/
import { MongoClient, Db, Collection, InsertOneResult, IntegerType, ObjectId } from 'mongodb';
import config from './Config';
import MongoInterface from '../interfaces/MongoInterface'
import CollectionVersion from '../interfaces/CollectionVersion';
import Enumerators from '../interfaces/Enumerators';
import Partner from '../interfaces/Partner';
import { Contact } from '../interfaces/Contact';


/********************************************************************************
 * Class Properties
 */
export default class MongoIO implements MongoInterface {
  private client?: MongoClient;
  private db?: Db;
  private peopleCollection?: Collection;
  private partnerCollection?: Collection;
  private versionCollection?: Collection;
  private enumeratorsCollection?: Collection;

  /********************************************************************************
   * Constructor 
   */
  constructor() {
  }

  /********************************************************************************
   * Connect to the Mongo Database, initilize
   * connection related objects, and load versions 
   * and enumerators
   */
  public async connect(): Promise<void> {
    const connectionString = config.getConnectionString();
    const dbName = config.getDbName();

    this.client = new MongoClient(connectionString);
    await this.client.connect();
    this.db = this.client.db(dbName);
    this.peopleCollection = this.db.collection(config.getPeopleCollectionName());
    this.partnerCollection = this.db.collection(config.getPartnerCollectionName());
    this.versionCollection = this.db.collection(config.getVersionCollectionName());
    this.enumeratorsCollection = this.db.collection(config.getenumeratorsCollectionName());

    console.info("Database", dbName, "Connected");
  }

  /********************************************************************************
   * Disconnect from the database
   */
  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = undefined;
      this.db = undefined;
    }
  }

  /********************************************************************************
   * Get a list of people
   * @returns Contacts
   */
  public async findPeople(): Promise<Contact[]> {
    if (!this.peopleCollection) {
      throw new Error("findPeople database not connected");
    }
    const filter = { "status": { "$ne": "Archived" } };
    const options = { projection: { _id: 1, firstName: 1, lastName: 1, eMail: 1, phone: 1 } };
    let results: Contact[];
    results = await this.peopleCollection.find(filter, options).toArray() as Contact[];
    return results;
  }

  /********************************************************************************
   * Get a list of all Partners
   * @returns Partner[]
   */
  public async findPartners(): Promise<Partner[]> {
    if (!this.partnerCollection) {
      throw new Error("findPartners database not connected");
    }
    const filter = { "status": { "$ne": "Archived" } };
    const options = { projection: { _id: 1, name: 1 } };
    let results: Partner[];
    results = await this.partnerCollection.find(filter, options).toArray() as Partner[];
    return results;
  }

  /********************************************************************************
   * Get a Partner by ID, uses an aggregation to resolve contact personId's with person information.
   * @param id 
   * @returns Partner
   */
  public async findPartner(id: string): Promise<Partner> {
    if (!this.partnerCollection) {
      throw new Error("findPartners - Database not connected");
    }

    const partnerId = new ObjectId(id);
    const pipeline = [
      { $match: { _id: partnerId } },
      { $lookup: { from: 'people', localField: 'contacts', foreignField: '_id', as: 'contactDetails' } },
      { $project: { _id: 1, name: 1, status: 1, description: 1, url: 1, lastSaved: 1, contactDetails: { $map: { input: '$contactDetails', as: 'contact', in: { _id: "$$contact._id", firstName: '$$contact.firstName', lastName: '$$contact.lastName', eMail: '$$contact.eMail', phone: '$$contact.phone' } } } } }
    ];

    let results: Partner | null;
    results = await this.partnerCollection.aggregate<Partner>(pipeline).next();
    if (results === null) {
      throw new Error("Partner Not Found " + id);
    } else {
      return results;
    }
  }

  /********************************************************************************
   * Insert a new Partner
   * @param thePartner 
   * @returns Inserted Values
   */
  public async insertPartner(thePartner: any): Promise<Partner> {
    if (!this.partnerCollection) {
      throw new Error("findPartners - Database not connected");
    }
    let results: InsertOneResult;
    let newPartner: Partner;

    results = await this.partnerCollection.insertOne(thePartner);
    let id = results.insertedId.toHexString();
    return await this.findPartner(id);
  }

  /********************************************************************************
   * Update a partner by ID
   * @param id 
   * @param data to update
   * @returns Updated Partner
   */
  public async updatePartner(id: string, data: any): Promise<Partner> {
    if (!this.partnerCollection) {
      throw new Error("findPartners - Database not connected");
    }

    const partnerId = new ObjectId(id);
    const filter = { _id: partnerId };
    const update = { $set: data };
    let thePartner: Partner;

    const result = await this.partnerCollection.findOneAndUpdate(filter, update);
    if (!result) {
      throw new Error("Update Partner found No Partner to Update " + partnerId);
    }

    return this.findPartner(id);
  }

  /********************************************************************************
   * Add a contact to a partner
   * @param partnerId 
   * @param personId 
   * @returns Contact for PersonID
   */
  public async addContact(partnerId: string, personId: string): Promise<Contact> {
    if (!this.peopleCollection || !this.partnerCollection) {
      throw new Error("addContact - Database not connected");
    }

    // Create OIDs
    const partnerID = new ObjectId(partnerId);
    const personID = new ObjectId(personId);

    // Get the current contacts
    let filter = { "_id": partnerID };
    let partner = await this.partnerCollection.findOne(filter);
    if (!partner) {
      throw new Error("addContact Partner Not Found" + partnerId);
    }

    // See if the contact already exists
    if (partner.contacts) {
      const index = partner.contacts.findIndex((id: ObjectId) => id.equals(personID));
      if (index != -1) {
        throw new Error("Add Contact " + personId + " to partner " + partnerId + " - already exists!");
      }
    }

    // Get the contact from people
    filter = { "_id": personID };
    let options = { projection: { _id: 1, firstName: 1, lastName: 1, phone: 1, eMail: 1 } };
    let theContact: Contact;
    theContact = await this.peopleCollection.findOne(filter, options) as Contact;
    if (!theContact) {
      throw new Error("Add Contact " + personId + " to partner " + partnerId + "Person Not Found!");
    }

    // add the personId to contacts
    filter = { "_id": partnerID };
    let update = { $push: { "contacts": personID } } as any;
    let result = await this.partnerCollection.findOneAndUpdate(filter, update);
    if (!result) {
      throw new Error("Add Contact Failed!")
    } else {
      return theContact;
    }
  }

  /********************************************************************************
   * Remove a contact from a partner
   * @param partnerId 
   * @param personId 
   * @returns {}
   */
  public async removeContact(partnerId: string, personId: string): Promise<void> {
    if (!this.partnerCollection) {
      throw new Error("removeContact - Database not connected");
    }

    // Get the current contacts
    const partnerID = new ObjectId(partnerId);
    const personID = new ObjectId(personId);
    let filter = { "_id": partnerID };
    let partner = await this.partnerCollection.findOne(filter);
    if (!partner || !partner.contacts) {
      throw new Error("removeContact Partner Not Found or no contacts array: " + partnerId);
    }

    // Remove the contact from the list
    const index = partner.contacts.findIndex((id: ObjectId) => id.equals(personID));
    if (index === -1) {
      throw new Error("Remove Contact " + personId + " not found in partner " + partnerId);
    }
    partner.contacts.splice(index, 1);

    // Update the partner contact list
    const update = { $set: { contacts: partner.contacts } };
    const result = await this.partnerCollection.findOneAndUpdate(filter, update);
    return;
  }

  /********************************************************************************
   * Load the collection Versions array
   */
  public async loadVersions(): Promise<void> {
    if (!this.versionCollection) {
      throw new Error("loadVersions - Database not connected");
    }
    let versions: CollectionVersion[];
    versions = await this.versionCollection.find({}).toArray() as Array<CollectionVersion>;
    config.versions = versions;
  }

  /********************************************************************************
   * Load the Enumerators based on a Collection Version
   * @param collectionName of the collection to use
   */
  public async loadEnumerators(collectionName: string): Promise<void> {
    if (!this.enumeratorsCollection) {
      throw new Error("loadEnumerators - Database not connected");
    }
    if (config.versions.length === 0) {
      throw new Error("loadEnumerators - Versions not loaded");
    }

    const theVersionString = config.versions
      .filter(version => version.collectionName === collectionName)
      .map(version => version.currentVersion.split('.').pop() || "0")
      .pop() || "0";
    const theVersion = parseInt(theVersionString);

    let query = { "version": theVersion };
    let enumerations: Enumerators;
    enumerations = await this.enumeratorsCollection.findOne(query) as Enumerators;
    if (!enumerations) {
      throw new Error("Enumerators not found for version:" + collectionName + ":" + theVersionString);
    }
    config.enumerators = enumerations.enumerators;
  }

}