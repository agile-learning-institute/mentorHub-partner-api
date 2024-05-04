import ShortName from '../models/ShortName';
import Partner from '../models/Partner';
import { Contact } from '../models/Contact';

export default interface MongoInterface {
  connect(): Promise<void>
  disconnect(): Promise<void>;
  findPartners(): Promise<ShortName[]>;
  findPartner(id: string): Promise<Partner>;
  insertPartner(thePartner: Partner): Promise<Partner>;
  updatePartner(id: string, data: any): Promise<Partner>;
  addContact(partnerId: string, personId: string): Promise<Contact>;
  removeContact(partnerId: string, personId: string): Promise<void>;
  loadVersions(): Promise<void>;
  loadEnumerators(collectionName: string): Promise<void>;
}
