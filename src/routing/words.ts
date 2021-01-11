
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

interface IFoundedWord {
    word_ru_value: string,
    word_en_value: string,
    category_label: string,
};

interface IGuessWord {
    wordId: number,
    ruValue: string,
    enValue: string,
    category: string | null,
};

const router: Router = express.Router();

router.get(`/word`, async (req: Request, res: Response) => {
    try {
        const query: string = queries.words.getWordByValue(req.query.ruValue as string, req.query.enValue as string);
        const [ rows ]: queryResultType = await connection.promise().query(query);
        const { word_ru_value, word_en_value, category_label } = (rows as [IFoundedWord])[0];

        const result: Array<object> = [{
            ruValue: word_ru_value,
            enValue: word_en_value,
            category: category_label,
        }];

        return res.send(successResponse(result));
    } catch (error: any) {
        return res.send(badResponse(error));
    }
});

router.get(`/guess-word`, async (_: Request, res: Response) => {
    try {
        const [ rows ]: queryResultType = await connection.promise().query(queries.words.getGuessWord());

        const { ruValue, wordId, category, enValue } = (rows as [IGuessWord])[0];
        const enValues: Array<string> = 
            (rows as [IGuessWord])
            .map((item: IGuessWord) => item.enValue)
            .sort(() => 0.5 - Math.random());

        const result: Array<object> = [{
            word: ruValue,
            wordId,
            category: category || `Без категории`,
            rightEnValue: enValue,
            enValues,
        }];

        return res.send(successResponse(result));
    } catch (error: any) {
        return res.send(badResponse(error));
    }
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

router.put(`/word`, async (req: Request, res: Response) => {
    try {
        const { id, ruValue, enValue, incrementViews, success } = req.body;
        await connection.promise().query(queries.words.updateWord(id, ruValue, enValue, incrementViews, success));
        return res.send(successResponse());
    } catch (error: any) {
        return res.send(badResponse(error));
    }
});

export default router;