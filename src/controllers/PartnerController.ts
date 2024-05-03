import ShortName from '../interfaces/ShortName'
import MongoInterface from '../interfaces/MongoInterface';
import { Request, Response } from 'express';
import { FindOneAndUpdateOptions, InsertOneResult, ObjectId } from 'mongodb';
import Partner from '../interfaces/Partner';
import { Contact } from '../interfaces/Contact';

export default class ConfigController {
  mongo: MongoInterface;

  constructor(mongoIO: MongoInterface) {
    this.mongo = mongoIO;
  }

  public getPartners = async (req: Request, res: Response) => {
    let results: ShortName[];

    try {
      results = await this.mongo.findPartners();
      res.json(results);
      res.status(200);
      console.info("GetPartners Completed");
    } catch (error) {
      res.json({error: error});
      res.status(500);
      console.info("GetPartners Failed");
    }
  }

  public getPartner = async (req: Request, res: Response) => {
    let thePartner: Partner;
    let theId = req.params.partnerId;

    try {
      thePartner = await this.mongo.findPartner(theId)
      res.json(thePartner);
      res.status(200);
      console.info("GetPartner %s Completed", theId);
    } catch (error) {
      res.json({error: error});
      res.status(500);
      console.info("GetPartner %s Failed", theId);
    }
    
  }

  public createPartner = async (req: Request, res: Response) => {
    try {
      const newPartner = await this.mongo.insertPartner(req.body)
      res.json(newPartner);
      res.status(200);
      console.info("AddPartner Completed for %s", newPartner._id);
    } catch (error) {
      res.json({error: error});
      res.status(500);
      console.info("AddPartner Failed");
    }
  }

  public updatePartner = async (req: Request, res: Response) => {
    const id = req.params.partnerId;
    let thePartner: Partner;
    
    try {
      thePartner = await this.mongo.updatePartner(id, req.body);
      res.json(thePartner);
      res.status(200);
      console.info("Update Partner Completed for %s", id);
    } catch (error) {
      res.json({error: error});
      res.status(500);
      console.info("UpdatePartner Failed for %s", id);
    }
  }

  public addContact = async (req: Request, res: Response) => {
    const partnerId = req.params.partnerId;
    const personId = req.params.personId;
    let theContact: Contact;
    
    try {
      theContact = await this.mongo.addContact(partnerId, personId);
      res.json(theContact);
      res.status(200);
      console.info("Add Contact %s to %s Complete", personId, partnerId);
    } catch (error) {
      res.json({error: error});
      res.status(500);
      console.info("Add Contact %s to %s Failed!", personId, partnerId);
    }
  }
  public removeContact = async (req: Request, res: Response) => {
    const partnerId = req.params.partnerId;
    const personId = req.params.personId;
    
    try {
      await this.mongo.removeContact(partnerId, personId);
      res.json({});
      res.status(200);
      console.info("Remove Contact %s to %s Complete", personId, partnerId);
    } catch (error) {
      res.json({error: error});
      res.status(500);
      console.info("Remove Contact %s to %s Failed!", personId, partnerId);
    }
  }
}