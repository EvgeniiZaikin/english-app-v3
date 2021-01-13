import express, { Router, Request, Response } from 'express';
import queries from '../database/queries';
import { successResponse, badResponse, queryResultType, dbRequest } from './index';

const router: Router = express.Router();

router.get(`/categories`, async (_: Request, res: Response) => {
    try {
        const result: queryResultType = await dbRequest(queries.categories.getCategories());
        return res.send(successResponse(result[0]));
    } catch (error: any) {
        return res.send(badResponse(error));
    }
});

router.post(`/category`, async (req: Request, res: Response) => {
    try {
        await dbRequest(queries.categories.createCategory(req.body.category_label));
        return res.send(successResponse());
    } catch (error: any) {
        return res.send(badResponse(error));
    }
});

export default router;