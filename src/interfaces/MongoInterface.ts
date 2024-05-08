import Partner from './Partner';
import { Contact } from './Contact';

export default interface MongoInterface {
  connect(): Promise<void>
  disconnect(): Promise<void>;
  findPeople(): Promise<Contact[]>;
  findPartners(): Promise<Partner[]>;
  findPartner(id: string): Promise<Partner>;
  insertPartner(thePartner: Partner): Promise<Partner>;
  updatePartner(id: string, data: any): Promise<Partner>;
  addContact(partnerId: string, personId: string): Promise<Contact>;
  removeContact(partnerId: string, personId: string): Promise<void>;
  loadVersions(): Promise<void>;
  loadEnumerators(collectionName: string): Promise<void>;
}
