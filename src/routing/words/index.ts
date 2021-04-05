import express, { Router, Request, Response } from 'express';
import { TQueryResult, dbRequest, endpoint } from '../helpers';
import queries from '../../database/queries';

import { IWord, IFoundedWord, IGuessWord } from './types';

const router: Router = express.Router();

router.get(`/word`, async (req: Request, res: Response) => {
  const logic = async (): Promise<object[]> => {
    const query: string = queries.words.getWordByValue(req.query.ruValue as string, req.query.enValue as string);
    const [rows]: TQueryResult = await dbRequest(query);
    const {
      word_ru_value: ruValue,
      word_en_value: enValue,
      category_label: category,
      isExpression,
      isSlang,
      isAbuse,
      isAbbreviation,
      transcription,
    } = (rows as [IFoundedWord])[0];

    const result: Array<object> = [
      {
        ruValue,
        enValue,
        category,
        isExpression,
        isSlang,
        isAbuse,
        isAbbreviation,
        transcription,
      },
    ];

    return result;
  };

  await endpoint(res, logic);
});

router.get(`/guess-word`, async (req: Request, res: Response) => {
  const logic = async (): Promise<object[]> => {
    const { useAbuse } = req.query;
    const [rows]: TQueryResult = await dbRequest(queries.words.getGuessWords(4, useAbuse === 'true'));
    const basicWords = rows as [IGuessWord];

    if (!basicWords.length) return [];

    const {
      ruValue,
      wordId,
      category,
      enValue,
      isExpression,
      isSlang,
      isAbuse,
      isAbbreviation,
      transcription,
    } = basicWords[0];

    let isRepeatValue: boolean = false;
    let countRepeatValues: number = 0;
    const guessWords: Array<IGuessWord> = [basicWords[0]];
    for (let i = 1; i < basicWords.length; i++) {
      if (basicWords[i].ruValue === ruValue) {
        isRepeatValue = true;
        countRepeatValues += 1;
      } else {
        guessWords.push(basicWords[i]);
      }
    }

    if (isRepeatValue) {
      const values: Array<string> = basicWords.map((item: IGuessWord) => item.ruValue);
      const words: TQueryResult = await dbRequest(
        queries.words.getGuessWords(countRepeatValues, useAbuse === 'true', values)
      );
      guessWords.push(...(words[0] as [IGuessWord]));
    }

    const enValues: Array<string> = guessWords.map((item: IGuessWord) => item.enValue).sort(() => 0.5 - Math.random());

    const result: Array<object> = [
      {
        word: ruValue,
        wordId,
        category: category || `Без категории`,
        rightEnValue: enValue,
        enValues,
        isExpression,
        isSlang,
        isAbuse,
        isAbbreviation,
        transcription,
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
        req.body.isExpression,
        req.body.isSlang,
        req.body.isAbuse,
        req.body.isAbbreviation,
        req.body.transcription
      )
    );

    const [rows]: TQueryResult = await dbRequest(queries.words.getLastAddedWord());

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

router.get('/count', async (_: Request, res: Response) => {
  interface IWordsCount {
    count: number;
  }

  const logic = async (): Promise<Number[]> => {
    const [rows]: TQueryResult = await dbRequest(queries.words.getWordsCount());
    return [(rows as [IWordsCount])[0].count];
  };

  await endpoint(res, logic);
});

export default router;
