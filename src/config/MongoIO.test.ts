/**
 * NOTE: This set of unit tests requires a mongodb 
 * You can run a mongo container with test data using
 * mh up mongodb
 */
import MongoIO from './MongoIO';
import Config from './Config';
import { Collection, Filter, Db } from 'mongodb';
import { CollectionVersion } from '../interfaces/CollectionVersion';
import { Partner } from '../interfaces/Partner';

describe('MongIO', () => {
    let config: Config;
    let mongoIo: MongoIO;   
    let collection: Collection;

    beforeEach(async () => {
        config = new Config();
        mongoIo = new MongoIO(config);
        await mongoIo.connect();
    });

    afterEach(async () => {
        await mongoIo.disconnect()
    });

    test('test GetPartnerCollection', () => {
        expect(mongoIo.getPartnerCollection().collectionName).toBe("partners");
    });

    test('test GetPeopleCollection', () => {
        expect(mongoIo.getPeopleCollection().collectionName).toBe("people");
    });

    test('test GetPartnerCollection', () => {
        expect(mongoIo.getVersionCollection().collectionName).toBe("msmCurrentVersions");
    });

    test('test GetPeopleCollection', () => {
        expect(mongoIo.getEnumeratorsCollection().collectionName).toBe("enumerators");
    });

    test('test LoadVersions', async () => {
        await mongoIo.loadVersions();
        expect(config.versions.length).toBeGreaterThan(0);
    });

    test('test LoadEnumerators', async () => {
        await mongoIo.loadVersions();
        console.log(config.versions);
        await mongoIo.loadEnumerators("paths");
        expect(config.enumerators).toHaveProperty("defaultStatus");
        expect(config.enumerators.defaultStatus.Active).toBe("Not Deleted")
    });
});