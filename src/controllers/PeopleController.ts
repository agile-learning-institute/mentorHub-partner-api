import PeopleService from '../services/PeopleService';
import { Request, Response } from 'express';
import { decodeToken, createBreadcrumb } from '@agile-learning-institute/mentorhub-ts-api-utils';

export default class PeopleController {

  constructor() {
  }

  public getPeople = async (req: Request, res: Response) => {
    try {
      const token = decodeToken(req);
      const breadcrumb = createBreadcrumb(token, req);
      const results = await PeopleService.FindPeople(req.query, token);
      res.json(results);
      res.status(200);
      console.info("GetPeople Completed", JSON.stringify(breadcrumb));
    } catch (error) {
      res.status(500);
      console.error("GetPeople Failed", error);
    }
  }
}