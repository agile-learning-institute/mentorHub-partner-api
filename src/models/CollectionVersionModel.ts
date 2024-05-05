import mongoose, {  Document } from 'mongoose';
import config from '../config/Config';

const versionCollectionName = config.getVersionCollectionName();

export interface CollectionVersionDoc extends Document {
    collectionName: string;
    currentVersion: string;
}

const CollectionVersionSchema = new mongoose.Schema({
    collectionName: { type: String, required: true, index: true },
    currentVersion: { type: String, required: true }
}, {
    collection: versionCollectionName,
    versionKey: false,
    timestamps: false 
});

export const CollectionVersion = mongoose.model<CollectionVersionDoc>('CollectionVersion', CollectionVersionSchema);
