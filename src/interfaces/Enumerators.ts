import { IntegerType, ObjectId, WithId } from "mongodb";

export interface EnumeratorsWithId extends Enumerators, WithId<Enumerators> {
  _id: ObjectId
}

export interface Enumerators extends Document {
  name: string, 
  status: string,
  version: IntegerType,
  enumerators: {}
}

