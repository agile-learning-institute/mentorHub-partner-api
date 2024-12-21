import PeopleController from '../controllers/PeopleController';
import PeopleService from '../services/PeopleService';
import { createBreadcrumb } from '../utils/Breadcrumb';
import { createToken } from '../utils/Token';
import { Request, Response } from 'express';

// Mock dependencies
jest.mock('../utils/Breadcrumb');
jest.mock('../utils/Token');
jest.mock('../services/PeopleService');

describe('PeopleController', () => {
    let controller: PeopleController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        controller = new PeopleController();

        // Mock Request
        mockRequest = {
            query: { name: 'John Doe' },
            ip: '192.168.1.1',
            headers: { 'x-correlation-id': 'test-correlation-id' }
        };

        // Mock Response
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks between tests
    });

    it('should return people and log success', async () => {
        const mockToken = { userId: 'aaaa00000000000000000001', roles: ['Staff'] };
        const mockBreadcrumb = { atTime: '2024-12-18T18:17:58.000Z', byUser: 'aaaa00000000000000000001', fromIp: '192.168.1.1', correlationId: 'test-correlation-id' };
        const mockResults = [{ name: 'John Doe', age: 30 }];

        // Mock functions
        (createToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        (PeopleService.FindPeople as jest.Mock).mockResolvedValue(mockResults);

        // Call the method
        await controller.getPeople(mockRequest as Request, mockResponse as Response);

        // Assertions
        expect(createToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        expect(PeopleService.FindPeople).toHaveBeenCalledWith(mockRequest.query, mockToken);
        expect(mockResponse.json).toHaveBeenCalledWith(mockResults);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors and log failure', async () => {
        const mockToken = { userId: 'aaaa00000000000000000001', roles: ['Staff'] };
        const mockBreadcrumb = { atTime: '2024-12-18T18:17:58.000Z', byUser: 'aaaa00000000000000000001', fromIp: '192.168.1.1', correlationId: 'test-correlation-id' };
        const mockError = new Error('FindPeople Failed');

        // Mock functions
        (createToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        (PeopleService.FindPeople as jest.Mock).mockRejectedValue(mockError);

        // Call the method
        await controller.getPeople(mockRequest as Request, mockResponse as Response);

        // Assertions
        expect(createToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        expect(PeopleService.FindPeople).toHaveBeenCalledWith(mockRequest.query, mockToken);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
});