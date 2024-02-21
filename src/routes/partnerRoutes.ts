import express from 'express';
import { PartnerController } from '../controllers/partnerController';

const router = express.Router();
const partnerController = new PartnerController();

router.get('/partner', (req, res) => {
    res.send ('Hello World from Partner!');
});

export default router;