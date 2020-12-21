import express, { Request, Response } from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
    try {
        await app.prepare();
        const server = express();

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