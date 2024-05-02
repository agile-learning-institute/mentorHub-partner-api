/**
 * This set of unit tests test controller init from env
 */
import Config from '../config/Config';
import MongoIO from '../config/MongoIO';
import MongoInterface from '../interfaces/MongoInterface';
import PartnerController from './PartnerController';
import { Request, Response } from 'express';

const mockRequest = (options = {}): Partial<Request> => ({
  ...options,
});

const mockResponse = (): Partial<Response> => {
  const res: any = {};
  res.send = jest.fn().mockReturnThis();
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

const mockMongoIO = (): MongoInterface => {
  return {
    loadVersions: jest.fn(),
    loadEnumerators: jest.fn(),
    getPartnerCollection: jest.fn(),
    getPeopleCollection: jest.fn(),
    getVersionCollection: jest.fn()
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

  test('test getPartners', () => {
    const expected = { message: 'Get Partner list' };
    const req = mockRequest({ query: { name: 'test' } });
    const res = mockResponse();

    partnerController.getPartners(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(expected);
    // expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test getPartner', () => {
    const expected = { message: 'Fetching partner' };
    const req = mockRequest({ query: { name: 'test' } });
    const res = mockResponse();

    partnerController.getPartner(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(expected);
    // expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test createPartner', () => {
    const expected = { message: 'Creating partner' };
    const req = mockRequest({ query: { name: 'test' } });
    const res = mockResponse();

    partnerController.createPartner(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(expected);
    // expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test updatePartner', () => {
    const expected = { message: 'Update partner' };
    const req = mockRequest({ query: { name: 'test' } });
    const res = mockResponse();

    partnerController.updatePartner(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(expected);
    // expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test addContact', () => {
    const expected = { message: 'Add Contact to partner' };
    const req = mockRequest({ query: { name: 'test' } });
    const res = mockResponse();

    partnerController.addContact(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(expected);
    // expect(res.status).toHaveBeenCalledWith(200);
  });

  test('test removeContact', () => {
    const expected = { message: 'Remove Contact from partner' };
    const req = mockRequest({ query: { name: 'test' } });
    const res = mockResponse();

    partnerController.removeContact(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(expected);
    // expect(res.status).toHaveBeenCalledWith(200);
  });

});
