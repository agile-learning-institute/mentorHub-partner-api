import Config from '../config/Config';
import ConfigController from './ConfigController';
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

describe('ConfigController', () => {
  let cfg: Config;
  let cfgController: ConfigController;

  beforeEach(() => {
    cfg = new Config();
    cfgController = new ConfigController(cfg); 
  });

  test('getConfig should properly modify response', () => {
    const expected = { message: 'Get Configurations' };
    const req = mockRequest();
    const res = mockResponse();

    cfgController.getConfig(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(expected);
    // expect(res.status).toHaveBeenCalledWith(200);
  });
});
