import { IntegerType, ObjectId, WithId } from "mongodb";

export default interface Enumerators extends Document, WithId<Document> {
  _id: ObjectId
  name: string, 
  status: string,
  version: IntegerType,
  enumerators: {}
}

