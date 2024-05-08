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
      res.status(200);
      res.json(results);
      console.info("GetPartners Completed");
    } catch (error) {
      res.status(500);
      res.json(error);
      console.info("GetPartners Failed");
    }
  }

  public getPartner = async (req: Request, res: Response) => {
    const theId = req.params.partnerId;

    try {
      const thePartner = await this.mongo.findPartner(theId)
      res.status(200);
      res.json(thePartner);
      console.info("GetPartner %s Completed", theId);
    } catch (error) {
      res.status(500);
      res.json(error);
      console.info("GetPartner %s Failed because %s", theId, error);
    }
    
  }

  public createPartner = async (req: Request, res: Response) => {
    try {
      const newPartner = await this.mongo.insertPartner(req.body)
      res.status(200);
      res.json(newPartner);
      console.info("AddPartner Completed for %s", newPartner._id);
    } catch (error) {
      res.status(500);
      res.json(error);
      console.info("AddPartner Failed with %s", error);
    }
  }

  public updatePartner = async (req: Request, res: Response) => {
    const id = req.params.partnerId;
    
    try {
      const thePartner = await this.mongo.updatePartner(id, req.body);
      res.status(200);
      res.json(thePartner);
      console.info("Update Partner Completed for %s", id);
    } catch (error) {
      res.status(500);
      res.json(error);
      console.info("UpdatePartner Failed for %s with %s", id, error);
    }
  }

  public addContact = async (req: Request, res: Response) => {
    const partnerId = req.params.partnerId;
    const personId = req.params.personId;
    
    try {
      const theContact = await this.mongo.addContact(partnerId, personId);
      res.status(200);
      res.json(theContact);
      console.info("Add Contact %s to %s Complete", personId, partnerId);
    } catch (error) {
      res.status(500);
      res.json(error);
      console.info("Add Contact %s to %s Failed for %s", personId, partnerId, error);
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
      res.status(500);
      res.json(error);
      console.info("Remove Contact %s to %s Failed with %s", personId, partnerId, error);
    }
  }
}