import express, { Router, Request, Response } from 'express';

import queries from '../database/queries';
import { dbRequest, endpoint } from './index';

const router: Router = express.Router();

router.get(`/categories`, async (_: Request, res: Response) => {
  const logic = async () => {
    const [categories] = await dbRequest(queries.categories.getCategories());
    return categories;
  };

  await endpoint(res, logic);
});

router.post(`/category`, async (req: Request, res: Response) => {
  const logic = async (): Promise<void> => {
    await dbRequest(queries.categories.createCategory(req.body.category_label));
  };

  await endpoint(res, logic);
});

export default router;
