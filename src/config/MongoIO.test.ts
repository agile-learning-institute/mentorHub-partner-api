/**
 * NOTE: This set of unit tests requires a mongodb 
 * You can run a mongo container with test data using
 * mh up mongodb
 */
import MongoIO from './MongoIO';
import Config from './Config';
import { Collection, Db } from 'mongodb';

describe('MongIO', () => {
    let config: Config;
    let mongoIo: MongoIO;   
    let collection: Collection;

    beforeEach(async () => {
        config = new Config();
        mongoIo = new MongoIO(config);

        await mongoIo.connect();
        collection = await mongoIo.GetPartnerCollection();
    });

    afterEach(async () => {
        await mongoIo.disconnect()
    });

    test('test GetPartnerCollection', () => {
        expect(mongoIo.GetPartnerCollection().collectionName).toBe("partners");
    });

    test('test Aggregate', async () => {
        expect(false).toBeTruthy();
    });

    test('test Find', async () => {
        expect(false).toBeTruthy();
    });

    test('test FindOne', async () => {
        expect(false).toBeTruthy();
    });

    test('test InsertOne', async () => {
        expect(false).toBeTruthy();
    });

    test('test UpdateOne', async () => {
        expect(false).toBeTruthy();
    });
});