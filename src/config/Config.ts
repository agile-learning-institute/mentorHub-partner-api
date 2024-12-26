/**
 * Class Config: This class manages configuration values 
 *      from the environment or configuration files, 
 *      and provides all data for the /config endpoint
 */

import { existsSync, readFileSync } from "fs";
import { join } from 'path';

interface ConfigItem {
    name: string;
    value: string;
    from: string;
}

export default class Config {
    private static instance: Config; // Singleton 

    configItems: ConfigItem[] = [];
    versions: any[] = [];
    enumerators: any = {};
    BUILT_AT: string = '';
    LOGGING_LEVEL: string = '';
    CONFIG_FOLDER: string = '';
    MONGO_DB_NAME: string = '';
    CURRICULUM_COLLECTION_NAME: string = '';
    ENCOUNTERS_COLLECTION_NAME: string = '';
    PARTNERS_COLLECTION_NAME: string = '';
    PATHS_COLLECTION_NAME: string = '';
    PEOPLE_COLLECTION_NAME: string = '';
    PLANS_COLLECTION_NAME: string = '';
    RATINGS_COLLECTION_NAME: string = '';
    REVIEWS__COLLECTION_NAME: string = '';
    TOPICS_COLLECTION_NAME: string = '';
    VERSION_COLLECTION_NAME: string = '';
    ENUMERATORS_COLLECTION_NAME: string = '';
    CURRICULUM_UI_URI: string = '';
    ENCOUNTER_UI_URI: string = '';
    PARTNERS_UI_URI: string = '';
    PEOPLE_UI_URI: string = '';
    TOPICS_UI_URI: string = '';
    SEARCH_UI_URI: string = '';
    ELASTIC_INDEX_NAME: string = "";
    MONGO_CONNECTION_STRING: string = "";
    CURRICULUM_API_PORT: number = 0;
    ENCOUNTER_API_PORT: number = 0;
    PARTNERS_API_PORT: number = 0;
    PEOPLE_API_PORT: number = 0;
    TOPICS_API_PORT: number = 0;
    SEARCH_API_PORT: number = 0;
    ELASTIC_CLIENT_OPTIONS: any = {};

    // Default values
    stringPropertyDefaults = {
        "BUILT_AT": 'LOCAL',
        "CONFIG_FOLDER":'./',
        "LOGGING_LEVEL":'INFO',
        "MONGO_DB_NAME":'mentorHub',
        "CURRICULUM_COLLECTION_NAME":'curriculum',
        "ENCOUNTERS_COLLECTION_NAME":'encounters',
        "PARTNERS_COLLECTION_NAME":'partners',
        "PATHS_COLLECTION_NAME":'paths',
        "PEOPLE_COLLECTION_NAME":'people',
        "PLANS_COLLECTION_NAME":'plans',
        "RATINGS_COLLECTION_NAME":'ratings',
        "REVIEWS__COLLECTION_NAME":'reviews',
        "TOPICS_COLLECTION_NAME":'topics',
        "VERSION_COLLECTION_NAME":'msmCurrentVersions',
        "ENUMERATORS_COLLECTION_NAME":'enumerators',
        "SEARCH_UI_URI":'http://localhost:8080/',
        "PEOPLE_UI_URI":'http://localhost:8083/',
        "PARTNERS_UI_URI":'http://localhost:8085/',
        "TOPICS_UI_URI":'http://localhost:8087/',
        "CURRICULUM_UI_URI":'http://localhost:8089/',
        "ENCOUNTER_UI_URI":'http://localhost:8091/'
    };
    
    integerPropertyDefaults = {
        "CURRICULUM_API_PORT": "8088",
        "ENCOUNTER_API_PORT": "8090",
        "PARTNERS_API_PORT": "8084",
        "PEOPLE_API_PORT": "8082",
        "TOPICS_API_PORT": "8086",
        "SEARCH_API_PORT": "8081",
    };

    secretStringPropertyDefaults = {
        "ELASTIC_INDEX_NAME": 'mentorhub',
        "MONGO_CONNECTION_STRING": 'mongodb://mongodb:27017/?replicaSet=rs0'
    };

    secretJsonPropertyDefaults = {
        "ELASTIC_CLIENT_OPTIONS": '{"node":"http://localhost:9200"}'
    };

    /**
     * Constructor gets configuration values, loads the enumerators, and logs completion
     */
    constructor() {
        this.initialize();
    }

    public initialize() {      
        // Initialize Values
        this.configItems = [];

        for (const [key, defaultValue] of Object.entries(this.stringPropertyDefaults)) {
            const value = this.getConfigValue(key, defaultValue, false);
            (this as any)[key] = value;
        }
                
        for (const [key, defaultValue] of Object.entries(this.integerPropertyDefaults)) {
            const value = parseInt(this.getConfigValue(key, defaultValue, false));
            (this as any)[key] = value;
        }
                
        for (const [key, defaultValue] of Object.entries(this.secretStringPropertyDefaults)) {
            const value = this.getConfigValue(key, defaultValue, true);
            (this as any)[key] = value;
        }
                
        for (const [key, defaultValue] of Object.entries(this.secretJsonPropertyDefaults)) {
            const value = JSON.parse(this.getConfigValue(key, defaultValue, true));
            (this as any)[key] = value;
        }

        console.info("Configuration Initialized:", JSON.stringify(this.configItems));
    }

    /**
     * Get the named configuration value, look for the file and use it if present, 
     * else look for an environment variable, then use the default. 
     * 
     * @param name 
     * @param defaultValue 
     * @param isSecret 
     * @returns the value that was found.
     */
    private getConfigValue(name: string, defaultValue: string, isSecret: boolean): string {
        let value = process.env[name] || defaultValue;
        let from = 'default';

        const filePath = join(this.CONFIG_FOLDER, name);
        if (existsSync(filePath)) {
            value = readFileSync(filePath, 'utf-8').trim();
            from = 'file';
        } else {
            if (process.env[name]) {
                from = 'environment';
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

    public withToken(token: any): any {
        return {
            "configItems": this.configItems,
            "versions": this.versions,
            "enumerators": this.enumerators,
            "token": token
        };    
    }
}
