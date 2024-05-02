import { Request, Response } from 'express';
import MongoInterface from '../interfaces/MongoInterface';

export default class ConfigController {
  mongo: MongoInterface;

  constructor(mongoIO: MongoInterface) {
    this.mongo = mongoIO;
  }

  public getPartners = async (req: Request, res: Response) => {
    res.json({ message: 'Get Partner list' });
  }

  public getPartner = async (req: Request, res: Response) => {
    res.json({ message: 'Fetching partner' });
  }

  public createPartner = async (req: Request, res: Response) => {
    res.json({ message: 'Creating partner' });
  }

  public updatePartner = async (req: Request, res: Response) => {
    res.json({ message: 'Update partner' });
  }

  public addContact = async (req: Request, res: Response) => {
    res.json({ message: 'Add Contact to partner' });
  }
  public removeContact = async (req: Request, res: Response) => {
    res.json({ message: 'Remove Contact from partner' });
  }
}