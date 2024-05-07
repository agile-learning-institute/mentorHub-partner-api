import { Document, ObjectId, WithId } from "mongodb";

export interface Contact extends Document, WithId<Document> {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    phone: string;
}
