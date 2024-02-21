import { PartnerModel } from "../models/PartnerModel";

export class PartnerController {
  private partnerModel: PartnerModel;

  constructor() {
    this.partnerModel = new PartnerModel();
  }

  addPartner(req: any, res: any): void {
    console.log('hello world from addPartner');
  }

  getNames(req: any, res: any): void {
    console.log('hello world from getNames');
  }

  getPartnerById(req: any, res: any): void {    
    const result = this.partnerModel.getPartnerById(req.params.partnerId);
    res.send(`Get Partner: ${result}`);
  }

  updatePartner(req: any, res: any): void { 
    const result = this.partnerModel.updatePartner(req.params.partnerId, req.body);
    res.send(`Update Partner: ${result}`);
  }

  addContact(req: any, res: any): void {
    const result = this.partnerModel.addContact(req.params.partnerId, req.body);
    res.send(`Add Contact: ${result}`);
  }

  deleteContact(req: any, res: any): void {
    const result = this.partnerModel.deleteContact(req.params.partnerId, req.params.contactId);
    res.send(`Delete Contact: ${result}`);
  }
}
