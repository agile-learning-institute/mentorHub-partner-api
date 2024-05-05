import ShortName from './ShortName';
import { PartnerDoc } from '../models/PartnerModel';
import { ContactDoc } from '../models/ContactModel';

export default interface MongoInterface {
  connect(): Promise<void>
  disconnect(): Promise<void>;
  findPartners(): Promise<ShortName[]>;
  findPartner(id: string): Promise<PartnerDoc>;
  insertPartner(thePartner: PartnerDoc): Promise<PartnerDoc>;
  updatePartner(id: string, data: any): Promise<PartnerDoc>;
  addContact(partnerId: string, personId: string): Promise<ContactDoc>;
  removeContact(partnerId: string, personId: string): Promise<void>;
  loadVersions(): Promise<void>;
  loadEnumerators(collectionName: string): Promise<void>;
}
