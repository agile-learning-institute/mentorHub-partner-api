import PartnerService from '../services/PartnerService';
import { Request, Response } from 'express';
import { Token, createToken } from '../expressUtils/Token';
import { Breadcrumb, createBreadcrumb } from '../expressUtils/Breadcrumb';

export default class PartnerController {

  constructor() {
  }

  public getPartners = async (req: Request, res: Response) => {
    try {
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const results = await PartnerService.FindPartners(req.query, token)
      res.status(200);
      res.json(results);
      console.info("GetPartners Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("GetPartners Failed:", message);
    }
  }

  public getPartner = async (req: Request, res: Response) => {
    try {
      const theId = req.params.partnerId;
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const thePartner = await PartnerService.FindPartner(theId, token);
      res.status(200);
      res.json(thePartner);
      console.info("GetPartner %s Completed with %s", theId, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("GetPartner Failed:", message);
    }
    
  }

  public createPartner = async (req: Request, res: Response) => {
    try {
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const newPartner = await PartnerService.InsertPartner(req.body, token, breadcrumb);
      res.status(200);
      res.json(newPartner);
      console.info("InsertPartner %s Completed with %s", newPartner._id, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("InsertPartner Failed with %s", message);
    }
  }

  public updatePartner = async (req: Request, res: Response) => {
    try {
      const id = req.params.partnerId;
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const thePartner = await PartnerService.UpdatePartner(id, req.body, token, breadcrumb);
      res.status(200);
      res.json(thePartner);
      console.info("Update Partner %s Completed with %s", id, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("UpdatePartner Failed:", message);
    }
  }

  public addContact = async (req: Request, res: Response) => {    
    try {
      const partnerId = req.params.partnerId;
      const personId = req.params.personId;
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const theContact = await PartnerService.AddContact(partnerId, personId, token, breadcrumb);
      res.status(200);
      res.json(theContact);
      console.info("Add Contact %s to %s Complete with %s", personId, partnerId, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Add Contact failed with %s", message);
    }
  }
  public removeContact = async (req: Request, res: Response) => {    
    try {
      const partnerId = req.params.partnerId;
      const personId = req.params.personId;
      const token = createToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const partner = await PartnerService.RemoveContact(partnerId, personId, token, breadcrumb);
      res.status(200);
      res.json(partner);
      console.info("Remove Contact %s to %s Complete with %s", personId, partnerId, JSON.stringify(breadcrumb));
    } catch (error) {
      const message = this.getMessage(error);
      res.status(500);
      res.json({error:message});
      console.warn("Remove Contact Failed with %s", message);
    }
  }

  public getMessage(error: any): string {
    if (error instanceof Error) return error.message;
    return String(error);
  }
}