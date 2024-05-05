/**
 * This set of unit tests test config init from env
 */
import config, { Config } from './Config';

describe('Config', () => {

    test('test BUILT_AT', () => {
        testConfigEnvironmentValue("BUILT_AT");
    });

    test('test CONFIG_FOLDER', () => {
        testConfigEnvironmentValue("CONFIG_FOLDER");
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

    test('test ENUMERATORS_COLLECTION', () => {
        testConfigEnvironmentValue("ENUMERATORS_COLLECTION");
    });

    function testConfigEnvironmentValue(configName: string) {
        process.env[configName] = "ENVIRONMENT";
        config.initialize();
        process.env[configName] = "";

        const items = config.configItems;

        const item = items.find(i => i.name === configName);
        expect(item).toBeDefined();
        if (item) {
            expect(item.name).toBe(configName);
            expect(item.from).toBe("environment");
            expect(item.value).toBe("ENVIRONMENT");
        }
    }

});