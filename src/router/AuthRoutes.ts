import {Router} from 'express';
import {Index} from '../controllers/Index';
import {TokenController} from '../controllers/TokenController';
import {Authenticate} from '../middleware/Authenticate';

class AuthRoutes {
    router: Router;
    btsCtrl:  Index;
    authCtlr: Authenticate;
    tokenCtlr: TokenController;

    constructor(){
        this.router = Router();
        this.btsCtrl = new Index();
        this.authCtlr = new Authenticate();
        this.tokenCtlr = new TokenController();
        this.routes();
    }

    // Authentication & Authorization required for the API
    // requests below.
    private routes(): void {
        this.router.post('/safcom', this.btsCtrl.getCarrierBts);
        this.router.post('/airtel', this.btsCtrl.getCarrierBts);
        this.router.post('/econet', this.btsCtrl.getCarrierBts);
        this.router.post('/telcom', this.btsCtrl.getCarrierBts);
        this.router.post('/range',  this.btsCtrl.getCarrierBtsByRange);
        this.router.post('/location', this.btsCtrl.getCarrierBtsLocation);

    }
}

export default new AuthRoutes().router;