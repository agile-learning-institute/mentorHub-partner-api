import { Request, Response } from 'express';

export const helloWorldHandler = (req: Request, res: Response) => {
  res.send('Hello, World!');
};


export default helloWorldHandler;