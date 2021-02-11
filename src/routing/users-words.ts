import express, { Router, Request, Response } from 'express';
import { queryResultType, dbRequest, endpoint } from './index';
import queries from '../database/queries';

interface IGuessWord {
    wordId: number,
    ruValue: string,
    enValue: string,
    category: string | null,
    userWordId: number
};

const router: Router = express.Router();

router.get(`/guess-word`, async (req: Request, res: Response) => {
    const logic = async () : Promise<object[]> => {
        const [ rows ]: queryResultType = await dbRequest(queries.usersWords.getGuessWords(req.query.userId as string, 4));
        const basicWords = (rows as [ IGuessWord ]);

        const { ruValue, wordId, category, enValue } = basicWords[0];

        let isRepeatValue: boolean = false;
        let countRepeatValues: number = 0;
        let guessWords: Array<IGuessWord> = [basicWords[0]];
        for (let i = 1; i < basicWords.length; i ++) {
            if (basicWords[i].ruValue === ruValue) {
                isRepeatValue = true;
                countRepeatValues++;
            } else {
                guessWords.push(basicWords[i]);
            }
        }

        if (isRepeatValue) {
            const values: Array<string> = basicWords.map((item: IGuessWord) => item.ruValue);
            const [ rows ]: queryResultType = await dbRequest(queries.words.getGuessWords(countRepeatValues, values));
            guessWords.push(...(rows as [IGuessWord]));
        }

        const enValues: Array<string> = guessWords
            .map((item: IGuessWord) => item.enValue)
            .sort(() => 0.5 - Math.random());

        const result: Array<object> = [{
            word: ruValue,
            wordId,
            category: category || `Без категории`,
            rightEnValue: enValue,
            enValues,
        }];

        return result;
    };

    await endpoint(res, logic);
});

export default router;