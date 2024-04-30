import express from 'express';
import Config from './config/Config'
import PartnerRoutes from './routes/PartnerRoutes';
import ConfigRoutes from './routes/ConfigRoutes';
import MongoIO from './config/MongoIO'

const app = express();
const config = new Config();
const mongo = new MongoIO(config);

const port = config.getPort();

app.use(express.json());
app.use('/api', PartnerRoutes);
app.use('/api/config/', ConfigRoutes)

mongo.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
