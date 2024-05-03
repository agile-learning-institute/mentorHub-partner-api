import { ObjectId, WithId } from "mongodb";
import { Breadcrumb } from "./Breadcrumb";
import { Contact } from "./Contact";

export default interface Partner extends Document, WithId<Document>{
    _id: ObjectId
    name: string;
    description?: string;
    status?: string;
    url?: string;
    contacts?: Contact[];
    lastSaved?: Breadcrumb;
}