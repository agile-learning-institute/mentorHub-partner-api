/**
 * This set of unit tests test config init from files
 * and uses the files in /test/configTest
 */
import config from './Config';

describe('Config', () => {

    // Clear all mocks before each test
    beforeEach(() => {
        process.env.CONFIG_FOLDER = "./test/configTest"
        config.initialize();
        process.env.CONFIG_FOLDER = "";
    });

    test('test fileStrings', () => {
        const testScope = {
            ...config.stringPropertyDefaults,
            ...config.secretStringPropertyDefaults
        };
        for (const [key, defaultValue] of Object.entries(testScope)) {
            if (key == "BUILT_AT") {
                expect(config.BUILT_AT).toBe("LOCAL");
            } else if (key == "CONFIG_FOLDER") {
                expect(config.CONFIG_FOLDER).toBe("./test/configTest");
            } else {
                expect((config as any)[key]).toBe("TEST_VALUE");
            }
        }
    });

    test('test fileIntegers', () => {
        for (const [key, defaultValue] of Object.entries(config.integerPropertyDefaults)) {
            expect((config as any)[key]).toBe(9999);
        }
    });

    test('test fileSecretJson', () => {
        for (const [key, defaultValue] of Object.entries(config.secretJsonPropertyDefaults)) {
            expect((config as any)[key]).toStrictEqual({"foo":"bat"});
        }
    });

    test('test fileConfigItemStringDefaults', () => {
        for (const [key, defaultValue] of Object.entries(config.stringPropertyDefaults)) {
            if (key == "BUILT_AT") {
                testConfigItemValue(key, "LOCAL", "default");
            } else if (key == "CONFIG_FOLDER") {
                testConfigItemValue(key, "./test/configTest", "environment");
            } else {
                testConfigItemValue(key, "TEST_VALUE", "file");
            }
        }
    });

    test('test fileConfigItemIntegerDefaults', () => {
        for (const [key, defaultValue] of Object.entries(config.integerPropertyDefaults)) {
            testConfigItemValue(key, "9999", "file")
        }
    });

    test('test fileConfigItemSecretDefaults', () => {
        const testScope = {
            ...config.secretJsonPropertyDefaults,
            ...config.secretStringPropertyDefaults
        }
        for (const [key, defaultValue] of Object.entries(testScope)) {
            testConfigItemValue(key, "secret", "file")
        }
    });

    function testConfigItemValue(configName: string, expectedValue: string, expectedFrom: string) {
        const items = config.configItems;
        const item = items.find(i => i.name === configName);
        expect(item).toBeDefined();
        if (item) {
            expect(item.name).toBe(configName);
            expect(item.from).toBe(expectedFrom);
            expect(item.value).toBe(expectedValue);
        }
    }

});