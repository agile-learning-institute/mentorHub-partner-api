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

    test('test Aggregate', async () => {
        collection = mongoIo.getPartnerCollection();
        let pipeline: any[] = [];
        
        // call Aggregate
        let result = await mongoIo.aggregate(collection, pipeline);

        expect(result.length()).toBeGreaterThan(1);
        let partner = result[0];
        expect(partner.name).toBe("");
        expect(partner.contacts.length()).toBeGreaterThan(1);

        let contact = partner.contacts[0];
        expect(contact.firstName).toBe("");
        expect(contact.lastName).toBe("");
        expect(contact.phone).toBe("");

        contact = partner.contacts[1];
        expect(contact.firstName).toBe("");
        expect(contact.lastName).toBe("");
        expect(contact.phone).toBe("");
    });

    test('test Find', async () => {
        collection = mongoIo.getVersionCollection();
        let query = {};
        let result: any[] = [];

        // call find
        result = await mongoIo.find(collection, query)

        expect(result.length).toBeGreaterThan(1);
    });

    test('test FindOne', async () => {
        collection = mongoIo.getVersionCollection();
        let query = {};
        let result: CollectionVersion;

        // call findOne
        result = await mongoIo.findOne(collection, query);

        expect(result.length).toBeGreaterThan(1);
    });

    test('test InsertOne', async () => {
        collection = mongoIo.getPartnerCollection();
        let partner = {

        }
        // call find
        let result = await mongoIo.addOne(collection, partner);

        // Assert results
        expect(result).toBe("have inserted ID")

        // delete inserted doc
    });

    test('test UpdateOne', async () => {
        collection = mongoIo.getPartnerCollection();
        let result: Partner;
        let query = {};
        let update = {};

        // Invoke updateOne
        result = await mongoIo.updateOne(collection, query, update);

        // Assert results
        expect(false).toBeTruthy();
    });

    test('test LoadVersions', async () => {
        await mongoIo.loadVersions();
        
        expect(config.versions.length).toBeGreaterThan(0);
    });

    test('test LoadEnumerators', async () => {
        await mongoIo.loadVersions();
        await mongoIo.loadEnumerators(1);

        expect(config.enumerators.one.two).toBe("");
    });
});