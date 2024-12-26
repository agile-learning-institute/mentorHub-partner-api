import PartnerController from '../controllers/PartnerController';
import PartnerService from '../services/PartnerService';
import { decodeToken, createBreadcrumb } from '@agile-learning-institute/mentorhub-ts-api-utils';
import { Request, Response } from 'express';

// Mock PartnerService
jest.mock('../services/PartnerService');

// Mock the utility module
jest.mock('@agile-learning-institute/mentorhub-ts-api-utils', () => ({
  decodeToken: jest.fn(),
  createBreadcrumb: jest.fn(),
}));

describe('PartnerController', () => {
    let controller: PartnerController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        controller = new PartnerController();

        mockRequest = {
            query: { name: 'Test Query' },
            params: { partnerId: 'partner123', personId: 'person456' },
            body: { name: 'New Partner' },
            ip: '192.168.1.1',
            headers: { 'x-correlation-id': 'test-correlation-id' },
        };

        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch partners successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockResults = [{ name: 'Partner A' }, { name: 'Partner B' }];

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        (PartnerService.FindPartners as jest.Mock).mockResolvedValue(mockResults);

        await controller.getPartners(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        expect(PartnerService.FindPartners).toHaveBeenCalledWith(mockRequest.query, mockToken);
        expect(mockResponse.json).toHaveBeenCalledWith(mockResults);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should fetch a single partner successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockPartner = { id: 'partner123', name: 'Partner A' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        (PartnerService.FindPartner as jest.Mock).mockResolvedValue(mockPartner);

        await controller.getPartner(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect(PartnerService.FindPartner).toHaveBeenCalledWith(mockRequest.params.partnerId, mockToken);
        expect(mockResponse.json).toHaveBeenCalledWith(mockPartner);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should create a partner successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockNewPartner = { _id: 'partner123', name: 'New Partner' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        (PartnerService.InsertPartner as jest.Mock).mockResolvedValue(mockNewPartner);

        await controller.createPartner(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        expect(PartnerService.InsertPartner).toHaveBeenCalledWith(mockRequest.body, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mockNewPartner);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should update a partner successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockUpdatedPartner = { id: 'partner123', name: 'Updated Partner' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        (PartnerService.UpdatePartner as jest.Mock).mockResolvedValue(mockUpdatedPartner);

        await controller.updatePartner(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect(PartnerService.UpdatePartner).toHaveBeenCalledWith(mockRequest.params.partnerId, mockRequest.body, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedPartner);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should add a contact successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockContact = { id: 'contact123', name: 'New Contact' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        (PartnerService.AddContact as jest.Mock).mockResolvedValue(mockContact);

        await controller.addContact(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect(PartnerService.AddContact).toHaveBeenCalledWith(mockRequest.params.partnerId, mockRequest.params.personId, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mockContact);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should remove a contact successfully', async () => {
        const mockToken = { userId: 'user123', roles: ['admin'] };
        const mockBreadcrumb = { correlationId: 'test-correlation-id' };
        const mockPartner = { id: 'partner123', name: 'Partner A' };

        (decodeToken as jest.Mock).mockReturnValue(mockToken);
        (createBreadcrumb as jest.Mock).mockReturnValue(mockBreadcrumb);
        (PartnerService.RemoveContact as jest.Mock).mockResolvedValue(mockPartner);

        await controller.removeContact(mockRequest as Request, mockResponse as Response);

        expect(decodeToken).toHaveBeenCalledWith(mockRequest);
        expect(createBreadcrumb).toHaveBeenCalledWith(mockToken, mockRequest);
        // expect(PartnerService.RemoveContact).toHaveBeenCalledWith(mockRequest.params.partnerId, mockRequest.params.personId, mockToken, mockBreadcrumb);
        expect(mockResponse.json).toHaveBeenCalledWith(mockPartner);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});