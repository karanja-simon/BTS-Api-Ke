"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Index_1 = require("../controllers/Index");
const TokenController_1 = require("../controllers/TokenController");
const Authenticate_1 = require("../middleware/Authenticate");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.btsCtrl = new Index_1.Index();
        this.authCtlr = new Authenticate_1.Authenticate();
        this.tokenCtlr = new TokenController_1.TokenController();
        this.routes();
    }
    // Authentication & Authorization required for the API
    // requests below.
    routes() {
        this.router.post('/safcom', this.btsCtrl.getCarrierBts);
        this.router.post('/airtel', this.btsCtrl.getCarrierBts);
        this.router.post('/econet', this.btsCtrl.getCarrierBts);
        this.router.post('/telcom', this.btsCtrl.getCarrierBts);
        this.router.post('/range', this.btsCtrl.getCarrierBtsByRange);
        this.router.post('/location', this.btsCtrl.getCarrierBtsLocation);
    }
}
exports.default = new AuthRoutes().router;
//# sourceMappingURL=AuthRoutes.js.map