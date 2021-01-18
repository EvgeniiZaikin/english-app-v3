import express, { Request, Response } from 'express';
import next from 'next';
import bodyParser from 'body-parser';

import '../database';
import routing from '../routing';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
    try {
        await app.prepare();
        const server = express();

        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());

        server.use('/api/words', routing.words);
        server.use('/api/categories', routing.categories);
        server.use('/api/users', routing.users);

        server.get('*', (req: Request, res: Response) => {
            return handle(req, res);
        });

        server.listen(port, (error?: any) => {
            if (error) {
                throw error;
            } else {
                console.log(`Server successfully start!`);
            }
        })
    } catch (error: any) {
        console.log(error);
        process.exit(1);
    }
})();