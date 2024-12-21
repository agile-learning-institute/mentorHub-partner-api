import PartnerService from '../services/PartnerService';
import { Request, Response } from 'express';
import { Token, createToken } from '../utils/Token';
import { Breadcrumb, createBreadcrumb } from '../utils/Breadcrumb';

export default class PartnerController {

  constructor() {
  }

  public getPartners = async (req: Request, res: Response) => {
    try {
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const results = await PartnerService.FindPartners(req.query, token)
      res.json(results);
      res.status(200);
      console.info("GetPartners Completed", breadcrumb);
    } catch (error) {
      res.status(500);
      console.info("GetPartners Failed:", error);
    }
  }

  public getPartner = async (req: Request, res: Response) => {
    try {
      const theId = req.params.partnerId;
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const thePartner = await PartnerService.FindPartner(theId, token);
      res.json(thePartner);
      res.status(200);
      console.info("GetPartner %s Completed %s", theId, breadcrumb);
    } catch (error) {
      res.status(500);
      console.info("GetPartner Failed:", error);
    }
    
  }

  public createPartner = async (req: Request, res: Response) => {
    try {
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const newPartner = await PartnerService.InsertPartner(req.body, token, breadcrumb);
      res.json(newPartner);
      res.status(200);
      console.info("AddPartner Completed for %s", newPartner._id);
    } catch (error) {
      res.status(500);
      console.info("AddPartner Failed with %s", error);
    }
  }

  public updatePartner = async (req: Request, res: Response) => {
    try {
      const id = req.params.partnerId;
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const thePartner = await PartnerService.UpdatePartner(id, req.body, token, breadcrumb);
      res.json(thePartner);
      res.status(200);
      console.info("Update Partner Completed:", breadcrumb);
    } catch (error) {
      res.status(500);
      console.info("UpdatePartner Failed:", error);
    }
  }

  public addContact = async (req: Request, res: Response) => {    
    try {
      const partnerId = req.params.partnerId;
      const personId = req.params.personId;
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const theContact = await PartnerService.AddContact(partnerId, personId, token, breadcrumb);
      res.json(theContact);
      res.status(200);
      console.info("Add Contact %s to %s Complete", personId, partnerId);
    } catch (error) {
      res.status(500);
      console.info("Add Contact failed with %s", error);
    }
  }
  public removeContact = async (req: Request, res: Response) => {    
    try {
      const partnerId = req.params.partnerId;
      const personId = req.params.personId;
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const partner = await PartnerService.RemoveContact(partnerId, personId, token, breadcrumb);
      res.json(partner);
      res.status(200);
      console.info("Remove Contact %s to %s Complete - %s", personId, partnerId, breadcrumb);
    } catch (error) {
      res.status(500);
      console.info("Remove Contact Failed with %s", error);
    }
  }
}