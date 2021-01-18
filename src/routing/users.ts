import express, { Router, Request, Response } from 'express';
import queries from '../database/queries';
import { dbRequest, endpoint, queryResultType } from './index';

const router: Router = express.Router();

interface IUser {
    user_login: string,
    user_password: string,
};

router.post(`/register`, async (req: Request, res: Response) => {
    const logic = async () => {
        const query: string = queries.users.checkUserExists(req.body.login);
        const [ rows ]: queryResultType = await dbRequest(query);
        if ((rows as Array<IUser>).length) {
            throw new Error(`User with this login already exists!`);
        } else {
            await dbRequest(queries.users.addUser(req.body.login, req.body.password));

            const [ rows ]: queryResultType = await dbRequest(queries.users.authUser(req.body.login, req.body.password));
            const user = (rows as Array<IUser>)[0];

            return user;
        }
    };

    await endpoint(res, logic);
});

router.post('/auth', async (req: Request, res: Response) => {
    const logic = async () => {
        const query: string = queries.users.authUser(req.body.login, req.body.password);
        const [ rows ]: queryResultType = await dbRequest(query);
        const result = rows as Array<IUser>;
        if (result.length) {
            return result[0];
        } else {
            throw new Error(`User with this login not found!`);
        }
    };

    await endpoint(res, logic);
});

export default router;