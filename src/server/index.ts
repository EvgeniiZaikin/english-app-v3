import express, { Request, Response } from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import { printLog, isDevelop } from '../utils/functions';

import '../database';
import routing from '../routing';

const app = next({ dev: isDevelop() });
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
    server.use('/api/users-words', routing.usersWords);

    server.get('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (error?: unknown) => {
      if (error) {
        throw error;
      } else {
        printLog(`Server successfully start!`);
      }
    });
  } catch (error: unknown) {
    printLog((error as Error).toString());
    process.exit(1);
  }
})();
