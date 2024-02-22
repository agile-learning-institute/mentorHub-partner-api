import { Partner } from './PartnerInterface'; //

export class PartnerModel {
    addPartner(partnerData: any): boolean {
        console.log('Hello World from addPartner');
        return true;
    }

    // getNames(): boolean {
    //     console.log('Hello World from getNames');
    //     return true;
    // }

    getPartnerById(_id: string): boolean {
        console.log('Hello World from getPartner');
        return true;
    }

    updatePartner(partnerId: string, partnerData: any): boolean {
        console.log('Hello World from updatePartner');
        return true;
    }

    addContact(partnerId: string, contactData: any): boolean {
        console.log('Hello World from addContact');
        return true;
    }

    deleteContact(partnerId: string, contactId: string): boolean {
        console.log('Hello World from deleteContact');
        return true;
    }
}

