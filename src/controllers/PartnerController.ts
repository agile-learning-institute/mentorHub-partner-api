import MongoInterface from '../interfaces/MongoInterface';
import { Request, Response } from 'express';

export default class ConfigController {
  mongo: MongoInterface;

  constructor(mongoIO: MongoInterface) {
    this.mongo = mongoIO;
  }

  public getPartners = async (req: Request, res: Response) => {
    try {
      const results = await this.mongo.findPartners();
      console.info("GetPartners Completed");
      res.status(200);
      res.json(results);
    } catch (error) {
      let message = this.getMessage(error);
      console.info("GetPartners Failed with:", message);
      res.status(500);
      res.json(message);
    }
  }

  public getPartner = async (req: Request, res: Response) => {
    const theId = req.params.partnerId;

    try {
      const thePartner = await this.mongo.findPartner(theId)
      console.info("GetPartner %s Completed", theId);
      res.status(200);
      res.json(thePartner);
    } catch (error) {
      let message = this.getMessage(error);
      console.info("GetPartner %s Failed because %s", theId, message);
      res.status(500);
      res.json(message);
    }
    
  }

  public createPartner = async (req: Request, res: Response) => {
    try {
      const newPartner = await this.mongo.insertPartner(req.body)
      console.info("AddPartner Completed for %s", newPartner._id);
      res.status(200);
      res.json(newPartner);
    } catch (error) {
      let message = this.getMessage(error);
      console.info("AddPartner Failed with %s", message);
      res.status(500);
      res.json(message);
    }
  }

  public updatePartner = async (req: Request, res: Response) => {
    const id = req.params.partnerId;
    
    try {
      const thePartner = await this.mongo.updatePartner(id, req.body);
      console.info("Update Partner Completed for %s", id);
      res.status(200);
      res.json(thePartner);
    } catch (error) {
      let message = this.getMessage(error);
      console.info("UpdatePartner Failed for %s with %s", id, message);
      res.status(500);
      res.json(message);
    }
  }

  public addContact = async (req: Request, res: Response) => {
    const partnerId = req.params.partnerId;
    const personId = req.params.personId;
    
    try {
      const theContact = await this.mongo.addContact(partnerId, personId);
      console.info("Add Contact %s to %s Complete", personId, partnerId);
      res.status(200);
      res.json(theContact);
    } catch (error) {
      let message = this.getMessage(error);
      console.info("Add Contact failed with %s", message);
      res.status(500);
      res.json(message);
    }
  }
  public removeContact = async (req: Request, res: Response) => {
    const partnerId = req.params.partnerId;
    const personId = req.params.personId;
    
    try {
      await this.mongo.removeContact(partnerId, personId);
      res.status(200);
      res.json({});
      console.info("Remove Contact %s to %s Complete", personId, partnerId);
    } catch (error) {
      let message = this.getMessage(error);
      console.info("Remove Contact Failed with %s", message);
      res.status(500);
      res.json(message);
    }
  }

  private getMessage(error: any): string {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message;
    return message;
  }
}