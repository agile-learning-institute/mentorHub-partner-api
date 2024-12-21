import { createBreadcrumb } from "./Breadcrumb";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { Token } from "./Token";

describe("createBreadcrumb", () => {
    it("should return a breadcrumb object with expected fields", () => {
        const token: Token = { 
            userId: "aaaa00000000000000000001", 
            roles: ["Staff"] 
        };

        // Mock Express request
        const req = {
            ip: "192.168.1.1",
            headers: { "x-correlation-id": "custom-correlation-id" },
        } as unknown as Request;

        // Call the function
        const result = createBreadcrumb(token, req);

        // Assert the returned breadcrumb
        expect(result).toEqual({
            atTime: expect.any(Date),
            byUser: new ObjectId(token.userId), 
            fromIp: String(req.ip), 
            correlationId: "custom-correlation-id"
        });
    });

    it("should generate a new UUID if X-Correlation-Id is missing", () => {
        // Mock token with renamed `userId` field
        const token: Token = { 
            userId: "aaaa00000000000000000001", 
            roles: ["Staff"] 
        };

        // Mock Express request without X-Correlation-Id
        const req = {
            ip: "192.168.1.1",
            headers: {},
        } as unknown as Request;

        // Regular expression to validate a UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        // Call the function
        const result = createBreadcrumb(token, req);

        // Assert the returned breadcrumb
        expect(result.atTime).toEqual(expect.any(Date)); 
        expect(result.byUser).toEqual(new ObjectId(token.userId));
        expect(result.fromIp).toEqual(req.ip); 
        expect(result.correlationId).toMatch(uuidRegex);
    });
});