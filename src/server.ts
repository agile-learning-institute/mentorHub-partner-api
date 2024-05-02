import express from 'express';
import Config from './config/Config'
import PartnerController from './controllers/PartnerController';
import ConfigController from './controllers/ConfigController';
import MongoIO from './config/MongoIO'

// Initilize configurations and inject dependencie into controllers
const config = new Config();
const mongo = new MongoIO(config);
const partnerController = new PartnerController(mongo);
const configController = new ConfigController(config);

const app = express();
app.use(express.json());

// Map routes to controllers
app.post('/api/partner/', (req, res) => partnerController.createPartner(req, res));
app.get('/api/partner/', (req, res) => partnerController.getPartners(req, res));
app.get('/api/partner/:partnerId', (req, res) => partnerController.getPartner(req, res));
app.patch('/api/partner/:partnerId', (req, res) => partnerController.updatePartner(req, res));
app.post('/api/partner/:partnerId/contact/:personId', (req, res) => partnerController.addContact(req, res));
app.delete('/api/partner/:partnerId/contact/:personId', (req, res) => partnerController.removeContact(req, res));
app.get('/api/config/', (req, res) => configController.getConfig(req, res));

// Start Server
const port = config.getPort();
mongo.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
