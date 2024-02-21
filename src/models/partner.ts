import { ObjectId } from 'mongodb';

interface Partner {
    _id?: ObjectId;
    name: string;
    description?: string;
    status?: 'Active' | 'Inactive' | 'Archived';
    url?: string;
    contacts?: ObjectId[];
    // lastSaved?: 
}