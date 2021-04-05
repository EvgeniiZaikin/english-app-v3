import express, { Router, Request, Response } from 'express';
import { TQueryResult, dbRequest, endpoint } from '../helpers';
import queries from '../../database/queries';

import { IGuessWord } from './types';

const router: Router = express.Router();

router.get(`/guess-word`, async (req: Request, res: Response) => {
  const logic = async (): Promise<object[]> => {
    const { useAbuse } = req.query;
    const [rows]: TQueryResult = await dbRequest(
      queries.usersWords.getGuessWords(req.query.userId as string, 4, useAbuse === 'true')
    );
    const basicWords = rows as [IGuessWord];

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

router.get(`/user-word`, async (req: Request, res: Response) => {
  const logic = async (): Promise<Array<boolean>> => {
    const [rows]: TQueryResult = await dbRequest(
      queries.usersWords.getUserWord((req.query.userId as unknown) as number, (req.query.id as unknown) as number)
    );

    return [!!(rows as Array<object>).length];
  };

  await endpoint(res, logic);
});

router.put(`/user-word`, async (req: Request, res: Response) => {
  const logic = async (): Promise<void> => {
    const { userId, id, incrementViews, success } = req.body;
    await dbRequest(queries.usersWords.updateWord(userId, id, incrementViews, success));
  };

  await endpoint(res, logic);
});

router.post(`/user-word`, async (req: Request, res: Response) => {
  const logic = async (): Promise<void> => {
    const { userId, id } = req.body;
    await dbRequest(queries.usersWords.addUserWord(userId, id));
  };

  await endpoint(res, logic);
});

export default router;
