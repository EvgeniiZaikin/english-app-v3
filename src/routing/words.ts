
import express, { Router, Request, Response } from 'express';
import { badResponse, queryResultType, successResponse } from './index';
import queries from '../database/queries';
import connection from '../database';

interface IWord {
    word_id: number,
    word_ru_value: string,
    word_en_value: string,
    word_count_views: number,
    word_count_success_guesses: number,
};

const router: Router = express.Router();

router.get(`/word`, (_: Request, res: Response) => {
    res.send(successResponse(`Ok!`));
});

router.post(`/word`, async (req: Request, res: Response) => {
    try {
        await connection.promise().query(queries.words.createWord(req.body.ruValue, req.body.enValue));

        const [ rows ]: queryResultType = await connection.promise().query(queries.words.getLastAddedWord()); 
        
        const wordId: number = (rows as [IWord])[0].word_id;
        await connection.promise().query(queries.categoriesWordsBunch.post(wordId, req.body.category));

        return res.send(successResponse());
    } catch (error: any) {
        return res.send(badResponse(error));
    }
});

export default router;