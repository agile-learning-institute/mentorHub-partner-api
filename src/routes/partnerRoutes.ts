import express from 'express';
import { PartnerController } from '../controllers/partnerController';

const router = express.Router();
const partnerController = new PartnerController();

router.post('/', (req, res) => {
     partnerController.addPartner();
     res.send('Hello World from addPartner');
});

router.get('/', (req, res) => {
    partnerController.getNames();
    res.send('Hello World from getNames');
});

router.get('/:partnerId', (req, res) => {
    partnerController.getPartnerById();
    res.send('Hello World from getPartner');
});

router.patch('/:partnerId', (req, res) => {
    partnerController.updatePartner();
    res.send('Hello World from updatePartner');
});

router.post('/:partnerId/contacts/:contactId', (req, res) => {
     partnerController.addContact();
     res.send('Hello World from addContact');
});

router.delete('/:partnerId/contacts/:contactId', (req, res) => {
    partnerController.deleteContact();
    res.send('Hello World from deleteContact');
});

export default router;