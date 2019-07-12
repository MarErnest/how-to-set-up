# How to set-up Typescript with ExpressJS

* **Setting Up the Project**
    1. On your directory run ```yarn init```
    2. Install the dependencies for ```Typescript```
        * ```yarn add ts-node tslint typescript nodemon concurrently @types/node --save-dev```
    3. Set-up Typescript configuration
        * ```tsc --init``` *This will generate tsconfig.json*
    4. Set-up TSLint configuration
        * ```tslint --init```  *This will generate tslint.json*
    5. Inside ```src``` create **app.ts** and **server.ts**
    6. Set-up node scripts
        ### Copy to *package.json* scripts
        ```
        "scripts": {
            "start": "npm run serve",
            "build": "npm run build-ts && npm run tslint",
            "serve": "node dist/server.js",
            "watch-node": "nodemon dist/server.js",
            "watch": "concurrently -k -p \"[{name}]\" -n \"TypeScript,Node\" -c \"cyan.bold,green.bold\" \"npm run watch-ts\" \"npm run watch-node\"",
            "test": "tsc && jest",
            "watch-test": "npm run test -- --watchAll",
            "build-ts": "tsc",
            "watch-ts": "tsc -w",
            "tslint": "tslint -c tslint.json -p tsconfig.json",
            "copy-static-assets": "ts-node copyStaticAssets.ts",
            "debug": "npm run build && npm run watch-debug",
            "serve-debug": "nodemon --inspect dist/server.js",
            "watch-debug": "concurrently -k -p \"[{name}]\" -n \"TypeScript,Node\" -c \"yellow.bold,cyan.bold,green.bold\" \"npm run watch-ts\" \"npm run serve-debug\""
        }
        ```
    7. Checking *package.json***
        * Make sure main is set like this, ```"main": "dist/server.js"```
    8. Testing Set-up
        1. Make change to ```src/server/ts```
        2. Run ```npm run watch```
            * Check if ```dist``` folder is generated

* **Setting Up ExpressJS**
    1. Install dependencies
        * Install ```yarn add express body-parser --save```
        * Install typings ```yarn add @types/express @types/body-parser --save-dev```

    2. Creating ```Application Class``` in **app.js**
        ```
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
        ```
    3. Create ```server.ts```
        ```
        import app from './app';
        (async () => {
            try {
                const App = new app().instance;
                const PORT = App.get('PORT');
                App.listen(PORT, () => console.log(`App running on port ${PORT}`));
            } catch (err) {
                console.log(err);
            }
        })();
        ```
    4. Now go to ```localhost:3000/test``` and 
       you sould see ``` {
            great: "work"
        }```
