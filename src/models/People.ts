import { ObjectId } from "mongodb";

export interface People {
    _id?: ObjectId;
    name: string;
}