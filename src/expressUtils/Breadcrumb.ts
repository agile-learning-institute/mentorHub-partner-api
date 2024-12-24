import { Token } from "./Token"
import { Request } from "express";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

export interface Breadcrumb {
    atTime: Date;
    byUser: ObjectId;
    fromIp: string;
    correlationId: string;
}

/**
 * Create a breadcrumb dictionary from HTTP headers.
 * @param token - Token containing user information
 * @param req - Express Request object
 * @returns Breadcrumb dictionary
 */
export const createBreadcrumb = (token: Token, req: Request): Breadcrumb => {
    return {
        atTime: new Date(), 
        byUser: new ObjectId(token.userId),
        fromIp: String(req.ip), 
        correlationId: req.headers["x-correlation-id"] as string || uuidv4()
    };
};