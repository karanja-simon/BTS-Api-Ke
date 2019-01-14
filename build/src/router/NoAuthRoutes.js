"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TokenController_1 = require("../controllers/TokenController");
class NoAuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.tokenCtlr = new TokenController_1.TokenController();
        this.routes();
    }
    // Authentication & Authorization required for the API
    // requests below.
    routes() {
        this.router.post('/register', this.tokenCtlr.register);
        this.router.post('/auth/key', this.tokenCtlr.verifyToken);
    }
}
exports.default = new NoAuthRoutes().router;
//# sourceMappingURL=NoAuthRoutes.js.map