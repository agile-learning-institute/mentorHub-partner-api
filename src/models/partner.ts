import { ObjectId } from 'mongodb';

export interface Partner {
    _id?: ObjectId;
    name: string;
    description?: string;
    status?: string;
    url?: string;
    contacts?: Array<{ _id?: string}>;
    lastSaved?: {
        fromIp?: string;
        byUser?: string;
        atTime?: string;
        correlationId?: string;
    };
}

