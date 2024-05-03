/**
 * This set of unit tests test controller init from env
 */
import Config from '../config/Config';
import MongoIO from '../config/MongoIO';
import MongoInterface from '../interfaces/MongoInterface';
import Partner from '../interfaces/Partner';
import PartnerController from './PartnerController';
import { Request, Response } from 'express';

const mockRequest = (options = {}): Partial<Request> => ({
  ...options,
});

const mockResponse = (): Partial<Response> & { json: jest.Mock } => {
  const res: any = {};
  res.send = jest.fn().mockReturnThis();
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res as Partial<Response> & { json: jest.Mock };
};

const mockMongoIO = (): MongoInterface => {
  return {
    connect: jest.fn(),
    disconnect: jest.fn(),
    findPartners: jest.fn(),
    findPartner: jest.fn(),
    insertPartner: jest.fn(),
    updatePartner: jest.fn(),
    addContact: jest.fn(),
    removeContact: jest.fn(),
    loadVersions: jest.fn(),
    loadEnumerators: jest.fn()
  };
};

describe('PartnerController', () => {
  let partnerController: PartnerController;

  beforeEach(async () => {
    const mockMongo = mockMongoIO();
    partnerController = new PartnerController(mockMongo);
  });

  afterEach(async () => {
  });

  test('test getPartners', async () => {
    const data = [{ message: 'Get Partner list' }];
    const req = mockRequest({});
    const res = mockResponse();

    (partnerController.mongo.findPartners as jest.Mock).mockResolvedValue(data);
    await partnerController.getPartners(req as Request, res as Response);

    const jsonResponse = res.json.mock.calls[0][0];
    expect(Array.isArray(jsonResponse)).toBeTruthy();
    expect(jsonResponse.length).toBeGreaterThan(0);
    expect(jsonResponse[0].message).toBe("Get Partner list");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test getPartner', async () => {
    const data = { message: 'Get A Partner' };
    const req = mockRequest({params: { partnerId: '12345' }});
    const res = mockResponse();

    (partnerController.mongo.findPartner as jest.Mock).mockResolvedValue(data);
    await partnerController.getPartner(req as Request, res as Response);

    const jsonResponse = res.json.mock.calls[0][0];
    expect(jsonResponse.message).toBe("Get A Partner");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test createPartner', async () => {
    const data = { name: 'A New Partner' };
    const req = mockRequest({});
    const res = mockResponse();
    let thePartner: Partner;

    (partnerController.mongo.insertPartner as jest.Mock).mockResolvedValue(data);
    await partnerController.createPartner(req as Request, res as Response);

    const jsonResponse = res.json.mock.calls[0][0];
    expect(jsonResponse.name).toBe("A New Partner");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test updatePartner', async () => {
    const data = { description: 'Updated Description' };
    const req = mockRequest({params: { partnerId: '12345' }});
    const res = mockResponse();

    (partnerController.mongo.updatePartner as jest.Mock).mockResolvedValue(data);
    await partnerController.updatePartner(req as Request, res as Response);

    const jsonResponse = res.json.mock.calls[0][0];
    expect(jsonResponse.description).toBe("Updated Description");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test addContact', async () => {
    const data = { firstName:"Foo", lastName:"Bar" };
    const req = mockRequest({params: { partnerId: '12345', personId: '54321' }});
    const res = mockResponse();

    (partnerController.mongo.addContact as jest.Mock).mockResolvedValue(data);
    await partnerController.addContact(req as Request, res as Response);

    const jsonResponse = res.json.mock.calls[0][0];
    expect(jsonResponse.firstName).toBe("Foo");
    expect(jsonResponse.lastName).toBe("Bar");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test removeContact', async () => {
    const req = mockRequest({params: { partnerId: '12345', personId: '54321' }});
    const res = mockResponse();

    (partnerController.mongo.removeContact as jest.Mock).mockResolvedValue(null);
    await partnerController.removeContact(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

});
