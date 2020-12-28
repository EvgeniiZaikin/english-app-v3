
import express, { Router, Request, Response } from 'express';
import { successResponse } from './index';

const router: Router = express.Router();

router.get(`/word`, (_: Request, res: Response) => {
    res.send(successResponse(`Ok!`));
});

export default router;