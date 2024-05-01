import { Breadcrumb } from "./Breadcrumb";
import { Contact } from "./Contact";

export interface Partner {
    name: string;
    description: string;
    status: string;
    url: string;
    contacts: Contact[];
    lastSaved: Breadcrumb;
}