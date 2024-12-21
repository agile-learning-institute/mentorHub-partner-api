/**
 * This set of unit tests test config init from env
 */
import Config from './Config';

describe('Config', () => {
    let config = Config.getInstance();

    beforeEach(() => {
        // Setup environment variables
        for (const [key, defaultValue] of Object.entries({
            ...config.stringPropertyDefaults,
            ...config.secretStringPropertyDefaults
        })) {
            process.env[key] = "ENV_VALUE";
        }
        for (const [key, defaultValue] of Object.entries(
            config.integerPropertyDefaults
        )) {
            process.env[key] = "1234";
        }
        for (const [key, defaultValue] of Object.entries(
            config.secretJsonPropertyDefaults
        )) {
            process.env[key] = '{"foo":"bar"}';
        }

        // Initialize the Config
        config.initialize();

        // Housekeep Environment variables
        process.env.CONFIG_FOLDER = "";
        for (const [key, defaultValue] of Object.entries({
            ...config.stringPropertyDefaults,
            ...config.secretStringPropertyDefaults,
            ...config.integerPropertyDefaults,
            ...config.secretJsonPropertyDefaults
        })) {
            process.env[key] = "ENV_VALUE";
        }
    });

    test('test envStrings', () => {
        const testScope = {
            ...config.stringPropertyDefaults,
            ...config.secretStringPropertyDefaults
        };
        for (const [key, defaultValue] of Object.entries(testScope)) {
            expect((config as any)[key]).toBe("ENV_VALUE");
        }
    });

    test('test envIntegers', () => {
        for (const [key, defaultValue] of Object.entries(config.integerPropertyDefaults)) {
            expect((config as any)[key]).toBe(1234);
        }
    });

    test('test envSecretJson', () => {
        for (const [key, defaultValue] of Object.entries(config.secretJsonPropertyDefaults)) {
            expect((config as any)[key]).toStrictEqual({"foo":"bar"});
        }
    });

    test('test envConfigItemStringDefaults', () => {
        for (const [key, defaultValue] of Object.entries(config.stringPropertyDefaults)) {
            testConfigItemValue(key, "ENV_VALUE")
        }
    });

    test('test envConfigItemIntegerDefaults', () => {
        for (const [key, defaultValue] of Object.entries(config.integerPropertyDefaults)) {
            testConfigItemValue(key, "1234")
        }
    });

    test('test envConfigItemSecretDefaults', () => {
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
            expect(item.from).toBe("environment");
            expect(item.value).toBe(expectedValue);
        }
    }

});