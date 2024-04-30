import {getConfig} from '../controllers/ConfigController'
import express from 'express';
const router = express.Router();

router.get('/', getConfig);

export default router;