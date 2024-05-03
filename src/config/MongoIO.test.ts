/**
 * NOTE: This set of unit tests requires a mongodb 
 * You can run a mongo container with test data using
 * mh up mongodb
 */
import MongoIO from './MongoIO';
import Config from './Config';
import { Collection, Filter, Db } from 'mongodb';

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
        await mongoIo.loadEnumerators("paths");
        expect(config.enumerators).toHaveProperty("defaultStatus");
        expect(config.enumerators.defaultStatus.Active).toBe("Not Deleted")
    });

    test('test findPartners', async () => {
        const partners = await mongoIo.findPartners();
        expect(partners.length).toBeGreaterThan(1);
        expect(partners[0].name).toBeDefined();
        expect(partners[0]._id).toBeDefined();
    });

    test('test findPartner', async () => {
        const partner = await mongoIo.findPartner("bbbb00000000000000000000");
        expect(partner.name).toBe("Junior Jobs");
        expect(partner.status).toBe("Inactive");
        expect(partner.description).toBe("Members that are looking for junior level jobs");
        expect(partner.lastSaved).toBeDefined();
        expect(partner.contactDetails).toBeDefined();
        expect(partner.contactDetails).toBeInstanceOf(Array);
        const details = partner.contactDetails;
        if (details) {
            expect(details.length).toBe(2);
            expect(details[0].firstName).toBe("Michael");
            expect(details[0].lastName).toBe("Smith");
            expect(details[0].phone).toBe("875-959-5595");
            expect(details[1].firstName).toBe("Emily");
            expect(details[1].lastName).toBe("Smith");
            expect(details[1].phone).toBe("246-906-8608");
        }
    });

    test('test insertPartner', async () => {
        const input = { name: "Foo" };
        const output = await mongoIo.insertPartner(input);
        expect(output.name).toBe("Foo");

        const id = output._id;
        await mongoIo.getPartnerCollection().findOneAndDelete({ _id: id });
    });

    test('test updatePartner', async () => {
        let update = { description: "Updated Description" };
        let thePartner = await mongoIo.updatePartner("bbbb00000000000000000001", update);
        expect(thePartner.name).toBe("Enok");
        expect(thePartner.description).toBe("Updated Description");

        update = { description: "Reset Description" };
        thePartner = await mongoIo.updatePartner("bbbb00000000000000000001", update);
        expect(thePartner.name).toBe("Enok");
        expect(thePartner.description).toBe("Reset Description");
    });

    test('test addContact/removeContact', async () => {
        let contact = await mongoIo.addContact("bbbb00000000000000000002", "aaaa00000000000000000011");
        expect(contact.firstName).toBe("Alexande")
        expect(contact.lastName).toBe("Smith");
        expect(contact.phone).toBe("593-264-9430");

        let partner = await mongoIo.findPartner("bbbb00000000000000000002");
        expect(partner.name).toBe("Google Search");
        expect(partner.contactDetails).toBeDefined();
        expect(partner.contactDetails).toBeInstanceOf(Array);
        let details = partner.contactDetails;
        if (details) {
            expect(details.length).toBe(1);
            contact = details[0];
            expect(contact.firstName).toBe("Alexande");
            expect(contact.lastName).toBe("Smith");
            expect(contact.phone).toBe("593-264-9430");
        }
        
        await mongoIo.removeContact("bbbb00000000000000000002", "aaaa00000000000000000011")
        partner = await mongoIo.findPartner("bbbb00000000000000000002");
        expect(partner.name).toBe("Google Search");
        expect(partner.contactDetails).toBeDefined();
        expect(partner.contactDetails).toBeInstanceOf(Array);
        details = partner.contactDetails;
        if (details) {
            expect(details.length).toBe(0);
        }
    });

});