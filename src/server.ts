import express from 'express';
import http from 'http';
import config from './config/Config';
import PartnerController from './controllers/PartnerController';
import ConfigController from './controllers/ConfigController';
import MongoIO from './config/MongoIO'

export class Server {
    private mongoIO: MongoIO;
    private server?: http.Server;

    constructor(mongoIO: MongoIO) {
        this.mongoIO = mongoIO;
    }

    public async serve() {

        // Create controllers, inject dependencies
        const configController = new ConfigController();
        const partnerController = new PartnerController(this.mongoIO);

        // Initilize express app
        const app = express();
        app.use(express.json());

        // Map routes to controllers
        app.get('/api/partner/', (req, res) => partnerController.getPartners(req, res));
        app.get('/api/partner/:partnerId', (req, res) => partnerController.getPartner(req, res));
        app.post('/api/partner/', (req, res) => partnerController.createPartner(req, res));
        app.patch('/api/partner/:partnerId', (req, res) => partnerController.updatePartner(req, res));
        app.post('/api/partner/:partnerId/contact/:personId', (req, res) => partnerController.addContact(req, res));
        app.delete('/api/partner/:partnerId/contact/:personId', (req, res) => partnerController.removeContact(req, res));
        app.get('/api/config/', (req, res) => configController.getConfig(req, res));

        // Start Server
        const port = config.getPort();
        this.server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        // Register exit handler
        console.log("Registering Exit Handler");
        process.on('exit', () => this.onExitHandler());
        process.on('SIGTERM', () => this.onExitHandler());
        process.on('SIGINT', () => this.onExitHandler());
        process.on('SIGUSR1', () => this.onExitHandler());
        process.on('SIGUSR2', () => this.onExitHandler());
        process.on('uncaughtException', () => this.onExitHandler());
    }

    private async onExitHandler() {
        console.log('Server is shutting down...');
        if (this.server) {
            this.server.close(() => {
                console.log('HTTP server closed.');
            });
        }
        await this.mongoIO.disconnect();
        console.log('MongoDB connection closed.');
        process.exit();
    }
}

// Start the server
(async () => {
    const mongo = new MongoIO();
    await mongo.connect();
    const server = new Server(mongo);
    await server.serve();
})();
