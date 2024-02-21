import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 3000;

app.use(express.json()); //Middleware to parse JSON

const mongoUrl = 'mongodb://root:example@localhost:27017/?tls=false&directConnection=true'; // Connection URL
const client = new MongoClient(mongoUrl);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Failed to connect to MongoDB', e);
  }
}

connectToMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });

app.get('/', (req, res) => {
  res.send('Hello World');
});
