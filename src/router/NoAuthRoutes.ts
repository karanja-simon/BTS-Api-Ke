import {Router} from 'express';
import {TokenController} from '../controllers/TokenController';

class NoAuthRoutes {
    router: Router;
    tokenCtlr: TokenController;

    constructor(){
        this.router = Router();
        this.tokenCtlr = new TokenController();
        this.routes();
    }

    // Authentication & Authorization required for the API
    // requests below.
    private routes(): void {
        this.router.post('/register', this.tokenCtlr.register);
        this.router.post('/auth/key', this.tokenCtlr.verifyToken);
    }
}

export default new NoAuthRoutes().router;