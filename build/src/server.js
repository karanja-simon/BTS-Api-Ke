"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");
const NoAuthRoutes_1 = require("./router/NoAuthRoutes");
const Authenticate_1 = require("./middleware/Authenticate");
const config = require('./../config/config');
const swaggerDoc = require('./../config/swagger.json');
class Server {
    constructor() {
        this.app = express();
        this.authCtlr = new Authenticate_1.Authenticate();
        this.config();
        this.routes();
    }
    config() {
        // setup mongoose
        const MONGO_URI = config.mongouri;
        const options = { server: { auto_reconnect: true } };
        mongoose.connect(MONGO_URI || process.env.MONGO_URI, options)
            .then(() => {
            console.log('BTS-API connected to DB @', MONGO_URI);
        }, (err) => {
            throw err;
        });
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger('dev'));
    }
    routes() {
        let router;
        router = express.Router();
        this.app.use('/', router.get('/', (req, res) => {
            res.json({ success: true, message: 'Welcome to BTS-API v1.0. Start by visiting /bts/api/v1/register to get a free api key!' });
        }));
        this.app.use('/bts/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
        this.app.use('/bts/api/v1/', NoAuthRoutes_1.default);
        // this.app.use('/bts/api/v1/', this.authCtlr.authenticateApiRequest, AuthRoutes);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map