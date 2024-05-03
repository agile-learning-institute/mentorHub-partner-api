import { ObjectId, WithId } from "mongodb";

export default interface ShortName extends Document, WithId<Document> {
    _id: ObjectId;
    name: string;
}
