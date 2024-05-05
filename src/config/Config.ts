/**
 * Class Config: This class manages configuration values 
 *      from the enviornment or configuration files, 
 *      and abstracts all file and mongodb i-o.
 */
import { CollectionVersionDoc } from "../models/CollectionVersionModel"
import { existsSync, readFileSync } from "fs";
import { join } from 'path';

interface ConfigItem {
    name: string;
    value: string;
    from: string;
}

export class Config {
    private static instance: Config; // Singleton 

    configItems: ConfigItem[] = [];
    versions: CollectionVersionDoc[] = [];
    enumerators: any = {};
    apiVersion: string = "";

    private configFolder: string = "./";
    private port: number = 8084;
    private connectionString: string = "";
    private dbName: string = "";
    private partnerCollectionName: string = "";
    private peopleCollectionName: string = "";
    private versionCollectionName: string = "";
    private enumeratorsCollectionName: string = "";


    /**
     * Constructor gets configuration values, loads the enumerators, and logs completion
     */
    constructor() {
        this.initialize();
    }

    public initialize() {
        this.configItems = [];
        this.versions = [];
        this.enumerators = {};
        this.apiVersion = "1.0." + this.getConfigValue("BUILT_AT", "LOCAL", false);
        this.configFolder = this.getConfigValue("CONFIG_FOLDER", "/opt/mentorhub-partner-api", false);
        this.port = parseInt(this.getConfigValue("PORT", "8084", false));
        this.connectionString = this.getConfigValue("CONNECTION_STRING", "mongodb://root:example@localhost:27017", true);
        this.dbName = this.getConfigValue("DB_NAME", "mentorHub", false);
        this.partnerCollectionName = this.getConfigValue("PARTNER_COLLECTION", "partners", false);
        this.peopleCollectionName = this.getConfigValue("PEOPLE_COLLECTION", "people", false);
        this.versionCollectionName = this.getConfigValue("VERSION_COLLECTION", "msmCurrentVersions", false);
        this.enumeratorsCollectionName = this.getConfigValue("ENUMERATORS_COLLECTION", "enumerators", false);

        console.info("Configuration Initilized", JSON.stringify(this));        
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

        this.configItems.push({
            name: name,
            value: isSecret ? "secret" : value,
            from: from
        });
        return value;
    }

    /**
     * Singleton Constructor
     */
    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    /** 
     * Simple Getters
     */
    public getPort(): number {
        return this.port;
    }

    public getPartnerCollectionName(): string {
        return this.partnerCollectionName;
    }

    public getPeopleCollectionName(): string {
        return this.peopleCollectionName;
    }

    public getVersionCollectionName(): string {
        return this.versionCollectionName;
    }

    public getenumeratorsCollectionName(): string {
        return this.enumeratorsCollectionName
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

// Create a singleton instance of Config and export it
const config = Config.getInstance();
export default config;