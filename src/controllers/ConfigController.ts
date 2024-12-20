import { Request, Response } from 'express';
import config from '../config/Config';

export default class ConfigController {

  constructor() {
  }

  public getConfig = async (req: Request, res: Response) => {
    res.json(config.withToken({}));
    res.status(200);
    console.info("GetConfig Completed");
  };
  
}
