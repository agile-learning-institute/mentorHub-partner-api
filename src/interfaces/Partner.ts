import { ObjectId, WithId } from "mongodb";
import { Breadcrumb } from "./Breadcrumb";
import { Contact } from "./Contact";

export interface PartnerWithId extends Partner, WithId<Partner> {
    _id: ObjectId
}

export interface Partner extends Document {
    name: string;
    description: string;
    status: string;
    url: string;
    contacts: Contact[];
    lastSaved: Breadcrumb;
}