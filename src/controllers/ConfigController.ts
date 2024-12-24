import { Request, Response } from 'express';
import Config from '../config/Config';
import { Token, createToken } from '../expressUtils/Token';
export default class ConfigController {

  constructor() {
  }

  public getConfig = async (req: Request, res: Response) => {
    const config = Config.getInstance()
    const token: Token = createToken(req);
    res.json(config.withToken(token));
    res.status(200);
    console.info("GetConfig Completed");
  };
  
}
