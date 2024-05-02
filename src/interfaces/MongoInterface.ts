import { Collection, IntegerType } from 'mongodb';

export default interface MongoInterface {
  aggregate(collection: Collection, pipeline: any[]): Promise<any>;
  find(collection: Collection, query: any): Promise<any[]>;
  findOne(collection: Collection, query: any): Promise<Document>;
  addOne(collection: Collection, doc: any): Promise<any>;
  updateOne(collection: Collection, query: any, update: any): Promise<Document>;

  loadVersions(): Promise<void>;
  loadEnumerators(version: IntegerType): Promise<void>;
  getPartnerCollection(): Collection;
  getPeopleCollection(): Collection;
  getVersionCollection(): Collection;
}
