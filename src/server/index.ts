import express, { Request, Response } from 'express';
import next from 'next';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

import routing from '../routing';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
    try {
        await app.prepare();
        const server = express();

        try {
            mysql.createConnection({
                'host': 'localhost',
                'user': 'root',
                'password' : 'UndeadKarsak26071993',
                'database': 'english-app',
            });
            console.log(`Create connection with database successfully init`);
        } catch (error: any) {
            console.log(`Error with create connection to database: ${ error }`);
        }

        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());

        server.use('/api/words', routing.words);

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