/**
 * This set of unit tests test config init from files
 * and uses the files in /test/configTest
 */
import config, { Config } from './Config';

describe('Config', () => {

    // Clear all mocks before each test
    beforeEach(() => {
        process.env.CONFIG_FOLDER = "./test/configTest";
        config.initialize();
        process.env.CONFIG_FOLDER = "";
    });

    test('test DB_NAME', () => {
        testConfigFileValue("DB_NAME");
    });

    test('test PORT', () => {
        testConfigFileValue("PORT");
    });

    test('test PARTNER_COLLECTION', () => {
        testConfigFileValue("PARTNER_COLLECTION");
    });

    test('test PEOPLE_COLLECTION', () => {
        testConfigFileValue("PEOPLE_COLLECTION");
    });

    test('test VERSION_COLLECTION', () => {
        testConfigFileValue("VERSION_COLLECTION");
    });

    test('test ENUMERATORS_COLLECTION', () => {
        testConfigFileValue("ENUMERATORS_COLLECTION");
    });

    function testConfigFileValue(configName: string) {
        const items = config.configItems;

        const item = items.find(i => i.name === configName);
        expect(item).toBeDefined();
        if (item) {
            expect(item.name).toBe(configName);
            expect(item.from).toBe("file");
            expect(item.value).toBe("TEST_VALUE");
        }
    }
});