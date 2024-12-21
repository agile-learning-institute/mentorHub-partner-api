/**
 * NOTE: This set of unit tests requires a mongodb 
 * You can run a mongo container with test data using
 * mh up mongodb
 */
import MongoIO from './MongoIO';
import config from './Config';
import { ObjectId } from 'mongodb';

describe('MongIO', () => {
    let mongoIo: MongoIO;

    beforeEach(async () => {
        config.initialize();
        mongoIo = new MongoIO();
        await mongoIo.connect(config.PEOPLE_COLLECTION_NAME);
    });

    afterEach(async () => {
        await mongoIo.disconnect()
    });

    test('test Connection', async () => {
        expect(config.versions.length).toBe(9);
        expect(config.enumerators).toHaveProperty("defaultStatus");
        expect(config.enumerators.defaultStatus.Active).toBe("Not Deleted")
    });

    test('test getAllFullDocuments()', async () => {
        const match = {}
        const project = {}
        const order = {}
        const results = await mongoIo.getDocuments(config.PEOPLE_COLLECTION_NAME, match, project, order)
        expect(results.length).toBeGreaterThan(30);
        expect(results[0]._id).toBeDefined();
        expect(results[0].userName).toBeDefined();
        expect(results[0].firstName).toBeDefined();
        expect(results[0].lastName).toBeDefined();
        expect(results[0].status).toBeDefined();
        expect(results[0].roles).toBeDefined();
    });

    test('test getSomePartialDocuments', async () => {
        const match = {lastName:"Jones"};
        const project = {_id:1, firstName:1, lastName:1}
        const order = {}
        const results = await mongoIo.getDocuments(config.PEOPLE_COLLECTION_NAME, match, project, order)
        expect(results.length).toBe(7);
        expect(results[0].userName).toBeUndefined();
        expect(results[0].stats).toBeUndefined();
        expect(String(results[0]._id)).toBe("aaaa00000000000000000024");
        expect(results[0].firstName).toBe("Jame");
    });

    test('test getOrderByAscending', async () => {
        const match = {lastName:"Jones", status: "Active"};
        const project = {_id:1, firstName:1, lastName:1};
        const order = {userName: 1};
        const results = await mongoIo.getDocuments(config.PEOPLE_COLLECTION_NAME, match, project, order)
        expect(results.length).toBe(2);
        expect(results[0].userName).toBeUndefined();
        expect(results[0].stats).toBeUndefined();
        expect(String(results[0]._id)).toBe("aaaa00000000000000000025");
        expect(results[0].firstName).toBe("Michael");
        expect(results[0].lastName).toBe("Jones");
        expect(String(results[1]._id)).toBe("aaaa00000000000000000029");
        expect(results[1].firstName).toBe("Samuel");
        expect(results[1].lastName).toBe("Jones");
    });

    test('test getOrderByDescending', async () => {
        const match = {lastName:"Jones", status: "Active"};
        const project = {_id:1, firstName:1, lastName:1};
        const order = {userName: -1};
        const results = await mongoIo.getDocuments(config.PEOPLE_COLLECTION_NAME, match, project, order)
        expect(results.length).toBe(2);
        expect(results[0].userName).toBeUndefined();
        expect(results[0].stats).toBeUndefined();
        expect(String(results[0]._id)).toBe("aaaa00000000000000000029");
        expect(results[0].firstName).toBe("Samuel");
        expect(results[0].lastName).toBe("Jones");
        expect(String(results[1]._id)).toBe("aaaa00000000000000000025");
        expect(results[1].firstName).toBe("Michael");
        expect(results[1].lastName).toBe("Jones");
    });

    test('test getDocument', async () => {
        const id = "aaaa00000000000000000027";
        const expected = {"_id":new ObjectId("aaaa00000000000000000027"),"userName":"EmilyJones","firstName":"Emily","lastName":"Jones","status":"Inactive","roles":["Member"],"partnerId":new ObjectId("bbbb00000000000000000001"),"title":"Distinguished","cadence":"Daily","eMail":"EmilyJones@fakemail.com","gitHub":"EmilyJones","device":"Mac (Intel)","location":"Asheville","phone":"290-453-3295","description":"I had a friend in high school named Rick Shaw, but he was fairly useless as a mode of transport.","lastSaved":{"atTime":new Date("2024-02-27T18:17:58.000Z"),"byUser":new ObjectId("00000001cfc5967f9ccead8a"),"fromIp":"192.168.1.3","correlationId":"ae078031-7de2-4519-bcbe-fbd5e72b69d3"}};
        const document = await mongoIo.getDocument(config.PEOPLE_COLLECTION_NAME, id);
        expect(document).toStrictEqual(expected);
    });

    test('test CRUD_Document', async () => {
        const newDocument = await mongoIo.insertDocument(config.PEOPLE_COLLECTION_NAME, {userName:"BigTester"});
        expect(newDocument._id).toBeDefined();
        expect(newDocument.userName).toBe("BigTester");

        const id = String(newDocument._id);
        const getDocument = await mongoIo.getDocument(config.PEOPLE_COLLECTION_NAME, id);
        expect(getDocument.userName).toBe("BigTester");

        const updatedDocument = await mongoIo.updateDocument(config.PEOPLE_COLLECTION_NAME, id, {firstName:"Big"});
        console.log("Updated: ", updatedDocument);
        expect(updatedDocument._id).toBeDefined();
        expect(updatedDocument.userName).toBe("BigTester");
        expect(updatedDocument.firstName).toBe("Big");

        const deletedDocument = await mongoIo.deleteDocument(config.PEOPLE_COLLECTION_NAME, id);
        expect(updatedDocument._id).toBeDefined();
        expect(updatedDocument.userName).toBe("BigTester");
        expect(updatedDocument.firstName).toBe("Big");

        const missingDocument = await mongoIo.getDocument(config.PEOPLE_COLLECTION_NAME, id);
        expect(missingDocument).toBeNull;
    });
});