/**
 * This set of unit tests test config init from env
 */
import { Config } from './Config';

describe('Config', () => {
    let config: Config;

    test('test default properties in getters', () => {
        config = new Config();
        expect(config.getConfigFolder()).toBe("/opt/mentorhub-partner-api");
    });

    test('test PORT', () => {
        testConfigDefaultValue("PORT","8084");
    });

    test('test getPort', () => {
        config = new Config();
        expect(config.getPort()).toEqual(8084);
    });

    test('test BUILT_AT', () => {
        testConfigDefaultValue("BUILT_AT","LOCAL");
    });

    test('test CONFIG_FOLDER', () => {
        testConfigDefaultValue("CONFIG_FOLDER","/opt/mentorhub-partner-api");
    });

    test('test CONNECTION_STRING', () => {
        testConfigDefaultValue("CONNECTION_STRING","mongodb://root:example@localhost:27017");
    });

    test('test DB_NAME', () => {
        testConfigDefaultValue("DB_NAME","test");
    });

    function testConfigDefaultValue(configName: string, expectedValue: string) {
        config = new Config();

        const items = config.getConfigItems();

        const item = items.find(i => i.name === configName);
        expect(item).toBeDefined();
        if (item) {
            expect(item.name).toBe(configName);
            expect(item.from).toBe("default");
            expect(item.value).toBe(expectedValue);
        }
    }

});