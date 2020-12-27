
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get(`/word`, (_: Request, res: Response) => {
    res.send(`Ok!`);
});

export default router;