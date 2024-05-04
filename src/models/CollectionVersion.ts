import { ObjectId, WithId } from "mongodb";

export default interface CollectionVersion extends Document, WithId<Document> {
  _id: ObjectId
  collectionName: string;
  currentVersion: string
}

