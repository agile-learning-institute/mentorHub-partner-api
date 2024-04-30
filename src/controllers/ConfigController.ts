import { Request, Response } from 'express';

export const getConfig = async (req: Request, res: Response) => {
  res.json({ message: 'Get Configurations' });
};
