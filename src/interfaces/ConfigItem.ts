/**
 * A config item, used to track where configuration values were found
 */
interface ConfigItem {
    name: string;
    value: string;
    from: string;
}
