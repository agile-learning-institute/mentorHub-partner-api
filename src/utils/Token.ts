import { Request } from "express";

export interface Token {
    userId: string; // MongoDB ObjectId as a string
    roles: string[]; // List of roles assigned to the user
}

/**
 * Create a token dictionary from HTTP headers.
 * @param req - Express Request object
 * @returns Token dictionary
 */
export const createToken = (req: Request): Token => {
    // TODO: Extract values from JWT - look at jsonwebtoken library
    const token = {
        userId: "aaaa00000000000000000001",
        roles: ["Staff"], 
    };
    return token;
};