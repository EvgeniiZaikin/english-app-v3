import express, { Router, Request, Response } from 'express';
import { badResponse, queryResultType, successResponse, dbRequest, endpoint } from './index';
import queries from '../database/queries';

interface IWord {
  word_id: number;
  word_ru_value: string;
  word_en_value: string;
  word_count_views: number;
  word_count_success_guesses: number;
}

interface IFoundedWord {
  word_ru_value: string;
  word_en_value: string;
  category_label: string;
}

interface IGuessWord {
  wordId: number;
  ruValue: string;
  enValue: string;
  category: string | null;
}

const router: Router = express.Router();

router.get(`/word`, async (req: Request, res: Response) => {
  const logic = async (): Promise<object[]> => {
    const query: string = queries.words.getWordByValue(req.query.ruValue as string, req.query.enValue as string);
    const [rows]: queryResultType = await dbRequest(query);
    const { word_ru_value, word_en_value, category_label } = (rows as [IFoundedWord])[0];

    const result: Array<object> = [
      {
        ruValue: word_ru_value,
        enValue: word_en_value,
        category: category_label,
      },
    ];

    return result;
  };

  await endpoint(res, logic);
});

router.get(`/guess-word`, async (_: Request, res: Response) => {
  const logic = async (): Promise<object[]> => {
    const [rows]: queryResultType = await dbRequest(queries.words.getGuessWords(4));
    const basicWords = rows as [IGuessWord];

    if (!basicWords.length) return [];

    const { ruValue, wordId, category, enValue } = basicWords[0];

    let isRepeatValue: boolean = false;
    let countRepeatValues: number = 0;
    let guessWords: Array<IGuessWord> = [basicWords[0]];
    for (let i = 1; i < basicWords.length; i++) {
      if (basicWords[i].ruValue === ruValue) {
        isRepeatValue = true;
        countRepeatValues++;
      } else {
        guessWords.push(basicWords[i]);
      }
    }

    if (isRepeatValue) {
      const values: Array<string> = basicWords.map((item: IGuessWord) => item.ruValue);
      const [rows]: queryResultType = await dbRequest(queries.words.getGuessWords(countRepeatValues, values));
      guessWords.push(...(rows as [IGuessWord]));
    }

    const enValues: Array<string> = guessWords.map((item: IGuessWord) => item.enValue).sort(() => 0.5 - Math.random());

    const result: Array<object> = [
      {
        word: ruValue,
        wordId,
        category: category || `Без категории`,
        rightEnValue: enValue,
        enValues,
      },
    ];

    return result;
  };

  await endpoint(res, logic);
});

router.post(`/word`, async (req: Request, res: Response) => {
  const logic = async (): Promise<void> => {
    await dbRequest(
      queries.words.createWord(
        req.body.ruValue,
        req.body.enValue,
        req.body.expression,
        req.body.slang,
        req.body.abuse,
        req.body.abbreviation
      )
    );

    const [rows]: queryResultType = await dbRequest(queries.words.getLastAddedWord());

    const wordId: number = (rows as [IWord])[0].word_id;
    await dbRequest(queries.categoriesWordsBunch.post(wordId, req.body.category));
  };

  await endpoint(res, logic);
});

router.put(`/word`, async (req: Request, res: Response) => {
  const logic = async (): Promise<void> => {
    const { id, ruValue, enValue, incrementViews, success } = req.body;
    await dbRequest(queries.words.updateWord(id, ruValue, enValue, incrementViews, success));
  };

  await endpoint(res, logic);
});

export default router;
