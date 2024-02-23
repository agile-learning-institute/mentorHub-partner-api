import express from 'express';
import { helloWorldHandler } from './Handlers/helloWorldHandler';

const app = express();
const port = 3000;

app.get('/api/partner/', helloWorldHandler);
app.post('/api/partner/', helloWorldHandler);
app.get('/api/partner/:partnerId', helloWorldHandler);
app.patch('/api/partner/:partnerId', helloWorldHandler);
app.post('/api/partner/:partnerId/contacts/:contactId', helloWorldHandler);
app.delete('/api/partner/:partnerId/contacts/:contactId', helloWorldHandler);
app.get('/api/people/', helloWorldHandler);
app.get('/api/enums', helloWorldHandler);
app.get('/api/config/', helloWorldHandler);
app.get('/api/health/', helloWorldHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});