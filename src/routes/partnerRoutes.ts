import express from 'express';
import { PartnerController } from '../controllers/partnerController';

const router = express.Router();
const partnerController = new PartnerController();

router.post('/', partnerController.addPartner);
router.get('/', partnerController.getNames);
router.get('/:partnerId', partnerController.getPartnerById);
router.patch('/api/partner/:partnerId', partnerController.updatePartner);
router.post('/api/partner/:partnerId/contact', partnerController.addContact);
router.delete('/api/partner/:partnerId/contact/:contactId', partnerController.deleteContact);

export default router;