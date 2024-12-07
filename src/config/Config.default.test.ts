/**
 * This set of unit tests test config init from env
 */
import config from './Config';

describe('Config', () => {

    test('test default properties in getters', () => {
        config.initialize();
        expect(config.getConfigFolder()).toBe("/opt/mentorhub-partner-api");
    });

    test('test getPort', () => {
        config.initialize();
        expect(config.getPort()).toEqual(8084);
    });

    test('test PORT', () => {
        testConfigDefaultValue("PORT","8084");
    });

    test('test BUILT_AT', () => {
        testConfigDefaultValue("BUILT_AT","LOCAL");
    });

    test('test CONFIG_FOLDER', () => {
        testConfigDefaultValue("CONFIG_FOLDER","/opt/mentorhub-partner-api");
    });

    test('test DB_NAME', () => {
        testConfigDefaultValue("DB_NAME","mentorHub");
    });

    test('test PARTNER_COLLECTION', () => {
        testConfigDefaultValue("PARTNER_COLLECTION","partners");
    });

    test('test PEOPLE_COLLECTION', () => {
        testConfigDefaultValue("PEOPLE_COLLECTION","people");
    });

    test('test VERSION_COLLECTION', () => {
        testConfigDefaultValue("VERSION_COLLECTION","msmCurrentVersions");
    });

    test('test VERSION_COLLECTION', () => {
        testConfigDefaultValue("ENUMERATORS_COLLECTION","enumerators");
    });

    test('test PERSON_UI_HOST', () => {
        testConfigDefaultValue("PERSON_UI_HOST","http://localhost:8083");
    });

    function testConfigDefaultValue(configName: string, expectedValue: string) {
        config.initialize();

        const items = config.configItems;

        const item = items.find(i => i.name === configName);
        expect(item).toBeDefined();
        if (item) {
            expect(item.name).toBe(configName);
            expect(item.from).toBe("default");
            expect(item.value).toBe(expectedValue);
        }
    }

});