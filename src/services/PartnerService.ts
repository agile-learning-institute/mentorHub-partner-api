/**
 * Class PeopleService: This is a stateless static class that
 *    provides business logic and RBAC for the PeopleController
 */
import { ObjectId } from "mongodb";
import Config from "../config/Config";
import MongoIO from "../config/MongoIO";
import { Breadcrumb } from "../utils/Breadcrumb";
import { Token } from "../utils/Token";

export default class PartnerService {
    
  /**
   * Constructor 
   */
  constructor() {
  }

  public static async FindPartners(query: any, token: Token): Promise<any[]> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    
    const match = {status: {$ne: "Archived"}}; // TODO - match from query
    const project = {_id: 1, name: 1};
    const order = {name: 1};
    const partners = await mongoIO.getDocuments(config.PARTNERS_COLLECTION_NAME, match, project, order);
    return partners;
  }

  public static async FindPartner(id: string, token: Token): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // Get the partner
    const partner = await mongoIO.getDocument(config.PARTNERS_COLLECTION_NAME, id);
    if (!partner) throw new Error(`Not Found: ${id}`);

    // Lookup contactDetails
    let contactDetails = []
    if (partner.contacts && partner.contacts.length > 0) {
      const match = {$and: [
        {_id: {$in: partner.contacts}}, 
        {status: {$ne: "Archived"}}
      ]}
      const project = {firstName: 1, lastName: 1, phone: 1, eMail: 1}
      const order = {lastName: 1, firstName: 1}
      contactDetails = await mongoIO.getDocuments(config.PEOPLE_COLLECTION_NAME, match, project, order)
    }

    // Add the details, remove the original property
    partner.contactDetails = contactDetails;
    delete partner.contacts
    return partner;
  }

  public static async InsertPartner(data: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");

    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    
    data.lastSaved = breadcrumb;
    data.status = "Active";
    data.contacts = [];
    const partner = await mongoIO.insertDocument(config.PARTNERS_COLLECTION_NAME, data);
    return PartnerService.FindPartner(partner._id, token);
  }

  public static async UpdatePartner(id: string, updates: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");

    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    updates.lastSaved = breadcrumb;
    const partner = await mongoIO.updateDocument(config.PARTNERS_COLLECTION_NAME, id, updates);
    if (!partner) throw new Error(`Partner Not Found ${id}`);

    return PartnerService.FindPartner(partner._id, token);
  }

  public static async AddContact(partnerId: string, personId: string, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // Verify this is a valid person
    const person = await mongoIO.getDocument(config.PEOPLE_COLLECTION_NAME, personId);
    if (!person) throw new Error(`Person Not Found ${personId}`);

    // Verify this is a valid partner
    const partner = await mongoIO.getDocument(config.PARTNERS_COLLECTION_NAME, partnerId);    
    if (!partner) throw new Error(`Partner Not Found ${partnerId}`);

    // Check for duplicate add
    const personObjectId = new ObjectId(personId);
    if (partner.contacts.some((contact: ObjectId) => contact.equals(personObjectId))) {
      throw new Error("Duplicates not allowed");
    }    

    //  Update the partner
    partner.contacts.push(personObjectId)    
    const update = {
      contacts: partner.contacts,
      lastSaved: breadcrumb
    }
    await mongoIO.updateDocument(config.PARTNERS_COLLECTION_NAME, partnerId, update)

    // Return the person details for the person
    return {
      _id: person._id,
      firstName: person.firstName,
      lastName: person.lastName,
      eMail: person.eMail,
      phone: person.phone
    }
  }

  public static async RemoveContact(partnerId: string, personId: string, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    // Only staff have access
    if (!token.roles.includes("Staff")) throw new Error("Access Denied");
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    // Verify this is a valid partner
    const partner = await mongoIO.getDocument(config.PARTNERS_COLLECTION_NAME, partnerId);
    if (!partner) throw new Error(`Partner Not Found ${partnerId}`);

    // Confirm the contact exists
    const removeMe = new ObjectId(personId);
    const contacts = (partner.contacts as ObjectId[]).filter((contact: ObjectId) => !contact.equals(removeMe));
    if (partner.contacts.length === contacts.length) throw new Error(`Person Not Found ${personId}`);

    // Update the partner record
    const update = {
      contacts: contacts,
      lastSaved: breadcrumb
    }
    await mongoIO.updateDocument(config.PARTNERS_COLLECTION_NAME, partnerId, update)
    return PartnerService.FindPartner(partnerId, token);
  }
}
