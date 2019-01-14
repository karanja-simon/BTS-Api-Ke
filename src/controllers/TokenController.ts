import {Request, Response} from 'express';
import Validator from './../validators/Validator';

let jwt = require('jsonwebtoken');
let config = require('./../../config/config');

class TokenController {

    constructor() {

    }

    public register(req: Request, res: Response): void {
        console.log('email: ', req.body);
        if (Validator.isValidEmail(req.body.email)) {
            // sign asynchronously
            jwt.sign({email: req.body.email}, config.key, (err, token) => {
                if (err) return res.json({status: 300, success: false, message: err});
                res.json({status: 200, success: true, token: token});
            });
        } else {
            res.json({status: 300, success: false, message: 'Invalid email'});
        }
    }

    public verifyToken(req: Request, res: Response) {
        let token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (!token) return res.json({status: 204, success: false, message: 'No toke provided'});
        jwt.verify(token, config.key, function (err, decoded) {
            if (err) return res.json({status: 204, success: false, message: 'Failed to authenticate token!'});
            res.json({success: true, token: decoded});
        });
    }

}

export {TokenController};