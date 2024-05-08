/**
 * This set of unit tests test controller init from env
 */
import MongoInterface from '../interfaces/MongoInterface';
import PeopleController from './PeopleController';
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
    findPeople: jest.fn(),
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

describe('PeopleController', () => {
  let peopleController: PeopleController;

  beforeEach(async () => {
    const mockMongo = mockMongoIO();
    peopleController = new PeopleController(mockMongo);
  });

  afterEach(async () => {
  });

  test('test getPeople', async () => {
    const data = [{ message: 'Get Partner list' }];
    const req = mockRequest({});
    const res = mockResponse();

    (peopleController.mongo.findPeople as jest.Mock).mockResolvedValue(data);
    await peopleController.getPeople(req as Request, res as Response);

    const jsonResponse = res.json.mock.calls[0][0];
    expect(Array.isArray(jsonResponse)).toBeTruthy();
    expect(jsonResponse.length).toBeGreaterThan(0);
    expect(jsonResponse[0].message).toBe("Get Partner list");
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
