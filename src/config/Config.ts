import { existsSync, readFileSync } from "fs";
import { IntegerType } from "mongodb";
import { join } from 'path';

/**
 * A config item, used to track where configuration values were found
 */
interface ConfigItem {
    name: string;
    value: string;
    from: string;
}

interface CollectionVersion {
  collectionName: string;
  versionNumber: string
}

/**
 * Class Config: This class manages configuration values 
 *      from the enviornment or configuration files, 
 *      and abstracts all file and mongodb i-o.
 */
export default class Config {
    private configItems: ConfigItem[] = []; 
    private versions: CollectionVersion[] = [];
    private enumerators: any;         
    
    private configFolder: string = "";
    private port: IntegerType = 8084;
    private connectionString: string;       
    private dbName: string;

    /**
     * Constructor gets configuration values, loads the enumerators, and logs completion
     */
    constructor() {
        this.getConfigValue("BUILT_AT", "LOCAL", false);
        this.configFolder = this.getConfigValue("CONFIG_FOLDER", "/opt/mentorhub-partner-api", false);
        this.port = parseInt(this.getConfigValue("PORT", "8084", false));
        this.connectionString = this.getConfigValue("CONNECTION_STRING", "mongodb://root:example@localhost:27017", true);
        this.dbName = this.getConfigValue("DB_NAME", "test", false);

        console.info("Configuration Initilized:", JSON.stringify(this.configItems));
    }

    /**
     * Get the named configuration value, from the environment if available, 
     * then from a file if present, and finally use the provided default if not 
     * found. This will add a ConfigItem that describes where this data was found
     * to the configItems array. Secret values are not recorded in the configItem.
     * 
     * @param name 
     * @param defaultValue 
     * @param isSecret 
     * @returns the value that was found.
     */
    private getConfigValue(name: string, defaultValue: string, isSecret: boolean): string {
        let value = process.env[name] || defaultValue;
        let from = 'default';

        if (process.env[name]) {
            from = 'environment';
        } else {
            const filePath = join(this.configFolder, name);
            if (existsSync(filePath)) {
                value = readFileSync(filePath, 'utf-8').trim();
                from = 'file';
            }
        }

        this.configItems.push({ name, value, from });
        return value;
    }

    /**
     * Get the named enumerators object from the enumerators version specified
     * 
     * @param version 
     * @param name 
     * @returns enumerators object {"Value":"Description"}
     */
    public getEnums(version: number, name: string): any {
        if (this.enumerators[version].version != version) {
            throw new Error("Invalid Enumerators File bad version number sequence")
        }
        if (this.enumerators[version].enumerators.hasOwnProperty(name)) {
            return this.enumerators[version].enumerators[name];
        } else {
            throw new Error("Enumerator does not exist:" + name);
        } 
    }

    /**
     * Simple Setters
     */
    public setEnumerators(enums: any) {
        this.enumerators = enums;
    }

    /** 
     * Simple Getters
     */
    public getPort(): IntegerType {
        return this.port;
    }

    public getConfigItems(): ConfigItem[] {
        return this.configItems;
    }

    public getConfigFolder(): string {
        return this.configFolder;
    }

    public getConnectionString(): string {
        return this.connectionString;
    }

    public getDbName(): string {
        return this.dbName
    }
}