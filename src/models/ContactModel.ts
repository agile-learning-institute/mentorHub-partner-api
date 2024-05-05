// ContactModel.ts
import mongoose, { Document } from 'mongoose';
import config from '../config/Config';

const peopleCollectionName = config.getPeopleCollectionName();

export interface ContactDoc extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

const ContactSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String }
}, {
    collection: peopleCollectionName, 
    toJSON: { virtuals: true },  
    toObject: { virtuals: true } 
});

export const Contact = mongoose.model('Contact', ContactSchema);
