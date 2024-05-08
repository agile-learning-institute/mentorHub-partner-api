/**
 * This set of unit tests test config init from env
 */
import config from './Config';

describe('Config', () => {

    test('test getter for default port', () => {
        expect(config.getPort()).toBe(8084);
    });

    test('test getter for default getPartnerCollectionName', () => {
        expect(config.getPartnerCollectionName()).toBe(getConfigValue( "PARTNER_COLLECTION"));
    });

    test('test getter for default getPeopleCollectionName', () => {
        expect(config.getPeopleCollectionName()).toBe(getConfigValue( "PEOPLE_COLLECTION"));
    });

    test('test getter for default getVersionCollectionName', () => {
        expect(config.getVersionCollectionName()).toBe(getConfigValue( "VERSION_COLLECTION"));
    });

    test('test getter for default getenumeratorsCollectionName', () => {
        expect(config.getenumeratorsCollectionName()).toBe(getConfigValue( "ENUMERATORS_COLLECTION"));
    });

    test('test getter for default getConfigFolder()', () => {
        expect(config.getConfigFolder()).toBe(getConfigValue( "CONFIG_FOLDER"));
    });

    test('test getter for default getConnectionString', () => {
        expect(config.getConnectionString()).toBe("mongodb://root:example@localhost:27017");
        expect(getConfigValue( "CONNECTION_STRING")).toBe("secret");
    });

    test('test getter for default getDbName', () => {
        expect(config.getDbName()).toBe(getConfigValue( "DB_NAME"));
    });

    function getConfigValue(configItemName: string): string {
        const items = config.configItems;

        const item = items.find(i => i.name === configItemName);
        expect(item).toBeDefined();
        if (item) {
            return item.value;
        } else {
            return "";
        }
    }
});