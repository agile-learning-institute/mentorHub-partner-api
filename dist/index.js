"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helloWorldHandler_1 = require("./Handlers/helloWorldHandler");
const app = (0, express_1.default)();
const port = 3000;
app.get('/api/partner/', helloWorldHandler_1.helloWorldHandler);
app.post('/api/partner/', helloWorldHandler_1.helloWorldHandler);
app.get('/api/partner/:partnerId', helloWorldHandler_1.helloWorldHandler);
app.patch('/api/partner/:partnerId', helloWorldHandler_1.helloWorldHandler);
app.post('/api/partner/:partnerId/contacts/:contactId', helloWorldHandler_1.helloWorldHandler);
app.delete('/api/partner/:partnerId/contacts/:contactId', helloWorldHandler_1.helloWorldHandler);
app.get('/api/people/', helloWorldHandler_1.helloWorldHandler);
app.get('/api/enums', helloWorldHandler_1.helloWorldHandler);
app.get('/api/config/', helloWorldHandler_1.helloWorldHandler);
app.get('/api/health/', helloWorldHandler_1.helloWorldHandler);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
