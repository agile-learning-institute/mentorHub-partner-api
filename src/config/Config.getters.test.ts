/**
 * This set of unit tests test config init from env
 */
import Config from './Config';

describe('Config', () => {
    let config: Config;

    test('test getter for default port', () => {
        config = new Config();
        expect(config.getPort()).toBe(8084);
    });

    test('test getter for default getPartnerCollectionName', () => {
        config = new Config();
        expect(config.getPartnerCollectionName()).toBe(getConfigValue(config, "PARTNER_COLLECTION"));
    });

    test('test getter for default getPeopleCollectionName', () => {
        config = new Config();
        expect(config.getPeopleCollectionName()).toBe(getConfigValue(config, "PEOPLE_COLLECTION"));
    });

    test('test getter for default getVersionCollectionName', () => {
        config = new Config();
        expect(config.getVersionCollectionName()).toBe(getConfigValue(config, "VERSION_COLLECTION"));
    });

    test('test getter for default getenumeratorsCollectionName', () => {
        config = new Config();
        expect(config.getenumeratorsCollectionName()).toBe(getConfigValue(config, "ENUMERATORS_COLLECTION"));
    });

    test('test getter for default getConfigFolder()', () => {
        config = new Config();
        expect(config.getConfigFolder()).toBe(getConfigValue(config, "CONFIG_FOLDER"));
    });

    test('test getter for default getConnectionString', () => {
        config = new Config();
        expect(config.getConnectionString()).toBe("mongodb://root:example@localhost:27017");
        expect(getConfigValue(config, "CONNECTION_STRING")).toBe("secret");
    });

    test('test getter for default getDbName', () => {
        config = new Config();
        expect(config.getDbName()).toBe(getConfigValue(config, "DB_NAME"));
    });

    function getConfigValue(config: Config, configItemName: string): string {
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