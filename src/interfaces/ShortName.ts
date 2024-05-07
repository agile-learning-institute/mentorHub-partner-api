import { ObjectId } from "mongodb";

export default interface ShortName {
    _id: ObjectId;
    name: string;
}
