import express from 'express';
import { PeopleController } from '../controllers/peopleController';

const router = express.Router();
const peopleController = new PeopleController();

router.get('/', (req, res) => {
    peopleController.getNames();
    res.send('Hello World from getNames');
});

export default router;