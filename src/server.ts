import express from 'express';
import Config from './config/Config'
import PartnerRoutes from './routes/PartnerRoutes';
import ConfigRoutes from './routes/ConfigRoutes';
import MongoIO from './config/MongoIO'

const app = express();
const config = new Config();
const mongo = new MongoIO(config);

app.use(express.json());
app.use('/api/partner', PartnerRoutes);
app.use('/api/config', ConfigRoutes);

const port = config.getPort();
mongo.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
