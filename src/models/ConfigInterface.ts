interface StoreConfig {
    CollectionName: string;
    Version: string;
    Filter: string;
}

export interface Config {
    apiVersion: string;
    Stores: StoreConfig[];
};