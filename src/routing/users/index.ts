import express, { Router, Request, Response } from 'express';
import queries from '../../database/queries';
import { dbRequest, endpoint, TQueryResult } from '../helpers';

import { IUser } from './types';

const router: Router = express.Router();

router.post(`/registration`, async (req: Request, res: Response) => {
  const logic = async (): Promise<IUser[]> => {
    const query: string = queries.users.checkUserExists(req.body.login);
    const [rows]: TQueryResult = await dbRequest(query);
    if ((rows as Array<IUser>).length) {
      throw new Error(`User with this login already exists!`);
    } else {
      await dbRequest(queries.users.addUser(req.body.login, req.body.password));

      const result: TQueryResult = await dbRequest(queries.users.authUser(req.body.login, req.body.password));
      const users = result[0] as Array<IUser>;

      return users;
    }
  };

  await endpoint(res, logic);
});

router.post('/authorization', async (req: Request, res: Response) => {
  const logic = async (): Promise<IUser[]> => {
    const query: string = queries.users.authUser(req.body.login, req.body.password);
    const [rows]: TQueryResult = await dbRequest(query);
    const result = rows as Array<IUser>;
    if (!result.length) {
      throw new Error(`User with this login or password not found!`);
    } else {
      return result;
    }
  };

  await endpoint(res, logic);
});

router.put('/remember', async (req: Request, res: Response) => {
  const logic = async (): Promise<void> => {
    const { userId, remember } = req.body;
    await dbRequest(queries.users.setUserRemember(userId, remember));
  };

  await endpoint(res, logic);
});

router.get('/', async (req: Request, res: Response) => {
  const logic = async (): Promise<IUser[]> => {
    const query: string = queries.users.getUserById(req.query.userId as string);
    const [rows]: TQueryResult = await dbRequest(query);
    const result = rows as Array<IUser>;
    if (!result.length) {
      throw new Error(`User with this id!`);
    } else {
      return result;
    }
  };

  await endpoint(res, logic);
});

export default router;
