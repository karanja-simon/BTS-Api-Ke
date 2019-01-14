"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenController_1 = require("../controllers/TokenController");
let jwt = require('jsonwebtoken');
let config = require('./../../config/config');
class Authenticate {
    constructor() {
        this.tokenCtlr = new TokenController_1.TokenController();
    }
    authenticateApiRequest(req, res, next) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token)
            return res.json({ status: 204, success: false, message: 'No token provided' });
        jwt.verify(token, config.key, function (err, decoded) {
            if (err)
                return res.json({ status: 401, message: 'Access restricted' });
            next();
        });
    }
}
exports.Authenticate = Authenticate;
//# sourceMappingURL=Authenticate.js.map