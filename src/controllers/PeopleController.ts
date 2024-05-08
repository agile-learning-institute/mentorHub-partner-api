import MongoInterface from '../interfaces/MongoInterface';
import { Request, Response } from 'express';
import { Contact } from '../interfaces/Contact';

export default class PeopleController {
  mongo: MongoInterface;

  constructor(mongoIO: MongoInterface) {
    this.mongo = mongoIO;
  }

  public getPeople = async (req: Request, res: Response) => {
    let results: Contact[];

    try {
      results = await this.mongo.findPeople();
      res.json(results);
      res.status(200);
      console.info("GetPeople Completed");
    } catch (error) {
      res.json({error: error});
      res.status(500);
      console.info("GetPeople Failed");
    }
  }
}