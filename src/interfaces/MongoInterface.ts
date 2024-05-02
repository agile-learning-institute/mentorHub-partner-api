import { Collection, IntegerType } from 'mongodb';

export default interface MongoInterface {
  loadVersions(): Promise<void>;
  loadEnumerators(collectionName: string): Promise<void>;
  getPartnerCollection(): Collection;
  getPeopleCollection(): Collection;
  getVersionCollection(): Collection;
}
