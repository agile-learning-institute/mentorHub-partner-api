/**
 * Class PeopleService: This is a stateless static class that
 *    provides business logic and RBAC for the PeopleController
 */
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
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    const match = {}; // TODO - match from query
    const project = {_id: 1, firstName: 1, lastName: 1};
    const order = {userName: 1};
    const people = await mongoIO.getDocuments(config.PARTNERS_COLLECTION_NAME, match, project, order);
    return people;
  }

  public static async FindPartner(id: string, token: Token): Promise<any> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    const person = await mongoIO.getDocument(config.PARTNERS_COLLECTION_NAME, id);
    return person;
  }

  public static async InsertPartner(data: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    
    data.lastSaved = breadcrumb;
    const person = await mongoIO.insertDocument(config.PARTNERS_COLLECTION_NAME, data);
    return person;
  }

  public static async UpdatePartner(id: string, updates: any, token: Token, breadcrumb: Breadcrumb): Promise<any> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();

    updates.lastSaved = breadcrumb;
    const partner = await mongoIO.updateDocument(config.PARTNERS_COLLECTION_NAME, id, updates);
    return partner;
  }

  public static async AddContact(partnerId: string, personId: string, token: Token, breadcrumb: Breadcrumb): Promise<any> {

  }

  public static async RemoveContact(partnerId: string, personId: string, token: Token, breadcrumb: Breadcrumb): Promise<any> {

  }
}
