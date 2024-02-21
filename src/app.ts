import express, { Express, Request, Response } from 'express';
import partnerRoutes from './routes/partnerRoutes';

const app: Express = express();
const PORT = 3000;

app.use(express.json()); //Middleware to parse JSON

//will be put into config file
// const mongoUrl = 'mongodb://root:example@localhost:27017/?tls=false&directConnection=true'; // Connection URL
// const client = new MongoClient(mongoUrl);

// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (e) {
//     console.error('Failed to connect to MongoDB', e);
//   }
// }

// connectToMongoDB();  
//will be put into config file

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });

app.use('/api', partnerRoutes);


