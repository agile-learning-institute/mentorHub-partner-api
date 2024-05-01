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

    test('test GetPeopleCollection', () => {
        expect(mongoIo.GetPeopleCollection().collectionName).toBe("people");
    });

    test('test GetPartnerCollection', () => {
        expect(mongoIo.GetVersionCollection().collectionName).toBe("msmCurrentVersions");
    });

    test('test Aggregate', async () => {
        // query {id:$oid{from test data}}
        // Aggregate contacts to person._id
        
        // call Aggregate
        await mongoIo.Aggregate();

        // Assert results
        // Assert contacts in results
        // Assert contacts is array
        // assert contacts[0].name, etc
        expect(false).toBeTruthy();
    });

    test('test Find', async () => {
        // query project name, id
        
        // call find
        await mongoIo.Find();

        // Assert results
        // Assert results len > 0
        expect(false).toBeTruthy();
    });

    test('test FindOne', async () => {
        // query {id: from test data}
        // update {description: }
        
        // call find
        await mongoIo.FindOne();

        // Assert description updated
        expect(false).toBeTruthy();
    });

    test('test InsertOne', async () => {
        // setup query 
        
        // call find
        await mongoIo.InsertOne();

        // Assert results
        expect(false).toBeTruthy();

        // delete inserted doc
    });

    test('test UpdateOne', async () => {
        // setup query 
        // query id from test data
        // update add id to contacts
        
        // call find
        await mongoIo.UpdateOne();

        // Assert results
        expect(false).toBeTruthy();
    });

    test('test Add-Remove Contact', async () => {
        // setup query 
        // query id from test data
        // update add id to contacts
        
        // call find
        await mongoIo.UpdateOne();

        // Assert results
        expect(false).toBeTruthy();

        // update remove id to contacts
        
        // call find
        await mongoIo.UpdateOne();

        // Assert results
        expect(false).toBeTruthy();
    });

    test('test LoadVersions', async () => {
        // setup query 
        
        // call find
        await mongoIo.LoadVersions();

        // Assert results
        expect(false).toBeTruthy();
    });

    test('test LoadEnumerators', async () => {
        // setup query 
        
        // call find
        await mongoIo.LoadEnumerators();

        // Assert results
        expect(false).toBeTruthy();
    });
});