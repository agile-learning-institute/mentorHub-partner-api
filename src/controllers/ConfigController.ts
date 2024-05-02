import { Request, Response } from 'express';
import Config from '../config/Config';

export default class ConfigController {
  cfg: Config;

  constructor(config: Config) {
    this.cfg = config;
  }

  public getConfig = async (req: Request, res: Response) => {
    res.json({ message: 'Get Configurations' });
  };
  
}
