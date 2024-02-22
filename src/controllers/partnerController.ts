import { PartnerModel } from "../models/PartnerModel";

export class PartnerController {
  private partnerModel: PartnerModel;

  constructor() {
    this.partnerModel = new PartnerModel();
  }

  addPartner(): void {
    console.log("hello world from addPartner");
  }

  // getNames(): void {
  //   console.log("hello world from getNames");
  // }

  getPartnerById(): void {
    console.log("hello world from getPartner");
  }

  updatePartner(): void {
    console.log("hello world from updatePartner");
  }

  addContact(): void {
    console.log("hello world from addContact");
  }

  deleteContact(): void {
    console.log("hello world from deleteContact");
  }
}
