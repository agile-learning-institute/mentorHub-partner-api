"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorldHandler = void 0;
const helloWorldHandler = (req, res) => {
    res.send('Hello, World!');
};
exports.helloWorldHandler = helloWorldHandler;
exports.default = exports.helloWorldHandler;
