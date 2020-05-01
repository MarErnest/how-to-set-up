import express, { Application, Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

interface IApp {
    instance: Application;
    registerMiddlewares(): void;
    registerRoutes(): void;
}

class App implements IApp {

    instance: Application;

    constructor() {
        this.instance = express();
        this.instance.set('PORT', 3000);
        this.instance.use(express.json());
        this.registerMiddlewares();
        this.registerRoutes();
    }

    registerMiddlewares() {
        this.instance.use(bodyParser.json({ limit: '5mb' }));
        this.instance.use(bodyParser.urlencoded({ limit: '5mb' }));
    }

    registerRoutes() {
        const router = Router();

        router.get('/test', (request: Request, response: Response) => {
            response.json({ great: 'work' });
        });
        this.instance.use(router);
    }

}


export default App;
