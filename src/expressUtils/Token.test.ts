import { createToken } from "./Token"
//*************************
// Current Token is a placeholder object - functionality to be developed and tested

describe("createToken", () => {
    it("should return a token object with user_id and roles", () => {
        const req = {} as any; // Mock Express Request object (not used here)

        // Call the function
        const result = createToken(req);

        // Assert the expected output
        expect(result).toEqual({
            userId: "aaaa00000000000000000001",
            roles: ["Staff"],
        });
    });
});