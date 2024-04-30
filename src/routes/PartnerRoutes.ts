import express from 'express';
const router = express.Router();

import { getPartner, getPartners, createPartner, updatePartner } from '../controllers/PartnerController';

router.get('/api/partner/', getPartners);
router.get('/api/partner/', getPartner);
router.post('/api/partner/', createPartner);
router.patch('/api/partner/', updatePartner);

export default router;
