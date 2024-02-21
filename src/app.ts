import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json()); //Middleware to parse JSON

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });

    