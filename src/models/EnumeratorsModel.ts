import mongoose from 'mongoose';
import config from '../config/Config';

const enumeratorsCollectionName = config.getenumeratorsCollectionName();

const EnumeratorsSchema = new mongoose.Schema({
    name: { type: String },
    status: { type: String },
    version: { type: Number },
    enumerators: { type: mongoose.Schema.Types.Mixed }
}, {
    collection: enumeratorsCollectionName,
    versionKey: false,
    timestamps: false
});

export const Enumerators = mongoose.model('Enumerators', EnumeratorsSchema);
