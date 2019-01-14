import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as swaggerUI from 'swagger-ui-express';

import AuthRoutes from './router/AuthRoutes';
import NoAuthRoutes from './router/NoAuthRoutes';
import {Authenticate} from './middleware/Authenticate';

const config = require('./../config/config');
const swaggerDoc = require('./../config/swagger.json');

class Server {
    public app: express.Application;
    authCtlr: Authenticate;

    constructor() {
        this.app = express();
        this.authCtlr = new Authenticate();
        this.config();
        this.routes();
    }

    private config(): void {
        // setup mongoose
        const MONGO_URI = config.mongouri;
        const options = {server: {auto_reconnect: true}};

        mongoose.connect(MONGO_URI || process.env.MONGO_URI, options)
            .then(() => {
                console.log('BTS-API connected to DB @', MONGO_URI);
            }, (err) => {
                throw err;
            });

        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger('dev'));

    }

    private routes(): void {
        let router: express.Router;
        router = express.Router();

        this.app.use('/', router.get('/', (req, res) => {
            res.json({success: true, message: 'Welcome to BTS-API v1.0. Start by visiting /bts/api/v1/register to get a free api key!'});
        }));
        this.app.use('/bts/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
        this.app.use('/bts/api/v1/', NoAuthRoutes);
        this.app.use('/bts/api/v1/', this.authCtlr.authenticateApiRequest, AuthRoutes);
    }
}

export default new Server().app;