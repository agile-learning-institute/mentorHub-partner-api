import { Router } from 'express';
import { getPartners, getPartner, createPartner, updatePartner, addContact, removeContact } from '../controllers/PartnerController';

const router = Router();

router.get('/', getPartners);
router.get('/:partnerId', getPartner);
router.post('/', createPartner);
router.patch('/:partnerId', updatePartner);
router.post('/:partnerId/contact/:personId', addContact);
router.delete('/:partnerId/contact/:personId', removeContact);

export default router;
