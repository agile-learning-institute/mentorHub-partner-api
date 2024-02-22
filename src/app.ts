import express, { Express, Request, Response } from 'express';
import partnerRoutes from './routes/partnerRoutes';
// import peopleRoutes from './routes/peopleRoutes';
// import enumsRoutes from './routes/enumsRoutes';
// import configRoutes from './routes/configRoutes';
// import healthRoutes from './routes/healthRoutes';

const app: Express = express();
const PORT = 3000;

app.use(express.json()); //Middleware to parse JSON
app.use('/api/partner', partnerRoutes);
app.use(express.urlencoded({ extended: true })); //Middleware to parse URL-encoded bodies

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

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });


// app.use('/api/', peopleRoutes);
// app.use('/api/', enumsRoutes);
// app.use('/api/', configRoutes);
// app.use('/api/', healthRoutes);

export default app;