/**
 * This set of unit tests test config init from env
 */
import Config from './Config';

describe('Config', () => {
    let config: Config;

    test('test BUILT_AT', () => {
        testConfigEnvironmentValue("BUILT_AT");
    });

    test('test CONFIG_FOLDER', () => {
        testConfigEnvironmentValue("CONFIG_FOLDER");
    });

    test('test CONNECTION_STRING', () => {
        testConfigEnvironmentValue("CONNECTION_STRING");
    });

    test('test DB_NAME', () => {
        testConfigEnvironmentValue("DB_NAME");
    });

    test('test PORT', () => {
        testConfigEnvironmentValue("PORT");
    });

    test('test PARTNER_COLLECTION', () => {
        testConfigEnvironmentValue("PARTNER_COLLECTION");
    });

    test('test PEOPLE_COLLECTION', () => {
        testConfigEnvironmentValue("PEOPLE_COLLECTION");
    });

    test('test VERSION_COLLECTION', () => {
        testConfigEnvironmentValue("VERSION_COLLECTION");
    });

    function testConfigEnvironmentValue(configName: string) {
        process.env[configName] = "ENVIRONMENT";
        config = new Config();
        process.env[configName] = "";

        const items = config.getConfigItems();

        const item = items.find(i => i.name === configName);
        expect(item).toBeDefined();
        if (item) {
            expect(item.name).toBe(configName);
            expect(item.from).toBe("environment");
            expect(item.value).toBe("ENVIRONMENT");
        }
    }

});