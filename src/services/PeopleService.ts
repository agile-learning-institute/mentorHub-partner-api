/**
 * Class PeopleService: This is a stateless static class that
 *    provides business logic and RBAC for the PeopleController
 */
import Config from "../config/Config";
import MongoIO from "../config/MongoIO";
import { Token } from "../utils/Token";

export default class PeopleService {
    
  /**
   * Constructor 
   */
  constructor() {
  }

  public static async FindPeople(query: any, token: Token): Promise<any[]> {
    const mongoIO = MongoIO.getInstance();
    const config = Config.getInstance();
    const match = {status: {$ne: "Archived"}}; // TODO - match from query
    const project = {_id: 1, firstName: 1, lastName: 1, phone: 1, eMail: 1 };
    const order = {userName: 1};
    const people = await mongoIO.getDocuments(config.PEOPLE_COLLECTION_NAME, match, project, order);
    return people;
  }
}
