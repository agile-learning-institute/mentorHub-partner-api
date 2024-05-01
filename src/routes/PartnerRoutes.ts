import { Router } from 'express';
import { getPartners, getPartner, createPartner, updatePartner } from '../controllers/PartnerController';

const router = Router();

router.get('/', getPartners);
router.get('/:id', getPartner);
router.post('/', createPartner);
router.patch('/:id', updatePartner);

export default router;
