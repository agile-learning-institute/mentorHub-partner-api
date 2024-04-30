import { Request, Response } from 'express';

export const getPartners = async (req: Request, res: Response) => {
  res.json({ message: 'Get Partner list' });
};

export const getPartner = async (req: Request, res: Response) => {
    res.json({ message: 'Fetching partner' });
  };
  
export const createPartner = async (req: Request, res: Response) => {
  res.json({ message: 'Creating partner' });
};

export const updatePartner = async (req: Request, res: Response) => {
    res.json({ message: 'Update partner' });
  };
  