/**
 * This set of unit tests test config init from env
 */
import config from './Config';

describe('Config', () => {

    test('test defaultStrings', () => {
        config.initialize();
        const testScope = {
            ...config.stringPropertyDefaults,
            ...config.secretStringPropertyDefaults
        };
        for (const [key, defaultValue] of Object.entries(testScope)) {
            expect((config as any)[key]).toBe(defaultValue);
        }
    });

    test('test defaultIntegers', () => {
        config.initialize();
        for (const [key, defaultValue] of Object.entries(config.integerPropertyDefaults)) {
            expect((config as any)[key]).toBe(parseInt(defaultValue));
        }
    });

    test('test getDefaultSecretJson', () => {
        config.initialize();
        for (const [key, defaultValue] of Object.entries(config.secretJsonPropertyDefaults)) {
            expect((config as any)[key]).toStrictEqual(JSON.parse(defaultValue));
        }
    });

    test('test getConfigItemDefaults', () => {
        config.initialize();
        const testScope = {
            ...config.stringPropertyDefaults,
            ...config.integerPropertyDefaults
        }
        for (const [key, defaultValue] of Object.entries(testScope)) {
            testConfigItemValue(key, defaultValue)
        }
    });

    test('test getConfigItemSecretDefaults', () => {
        config.initialize();
        const testScope = {
            ...config.secretJsonPropertyDefaults,
            ...config.secretStringPropertyDefaults
        }
        for (const [key, defaultValue] of Object.entries(testScope)) {
            testConfigItemValue(key, "secret")
        }
    });

    function testConfigItemValue(configName: string, expectedValue: string) {
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