import { ObjectId, WithId } from "mongodb";

export interface CollectionVersionWithId extends CollectionVersion, WithId<CollectionVersion> {
  _id: ObjectId
}

export interface CollectionVersion extends Document {
  collectionName: string;
  currentVersion: string
}

