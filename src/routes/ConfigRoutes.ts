import express from 'express';
const router = express.Router();

import { getConfig } from '../controllers/ConfigController';

router.get('/api/config/', getConfig);

export default router;
