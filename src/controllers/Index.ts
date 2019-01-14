import {Request, Response} from 'express';
import Validator from './../validators/Validator';

import BtsSafaricomController from '../controllers/BtsSafaricom';
import BtsAirtelController from '../controllers/BtsAirtel';
import BtsEconetController from '../controllers/BtsEconet';
import BtsTelcomController from '../controllers/BtsTelcom';

class Index {

    constructor() {

    }


    /**
     * Get every carrier bts [KENYA] locations with cellids, lacs and sitenames
     * where applicable. Typically the following will be returned on the response
     * object.
     * mcc: mobile country code
     * mnc: mobile network code
     * lac: location area code
     * cellid: cell tower id
     * lat: latitude
     * lon: longitude
     * @carriers - Safaricom, Airtel, Telcom Kenya, Econet (Formerly YU)
     * @param {Request} req
     * @param {Response} res
     */

    public getCarrierBts(req: Request, res: Response): void {
        if (Validator.isValidMnc(req)) {
            switch (req.body.mnc) {
                case '2':
                    BtsSafaricomController.getAllBts(req, res);
                    break;
                case '3':
                    BtsAirtelController.getAllBts(req, res);
                    break;
                case '5':
                    BtsEconetController.getAllBts(req, res);
                    break;
                case '7':
                    BtsTelcomController.getAllBts(req, res);
                    break;
                default:
                    res.json({status: 204, success: false, message: 'Mobile Network Code (MNC) not found'});
            }
        }
    }

    /**
     * Get carrier bts [KENYA] location form mcc, mnc, lac and cellid
     * Typically the following will be returned on the response
     * object.
     * mcc: mobile country code
     * mnc: mobile network code
     * lac: location area code
     * cellid: cell tower id
     * lat: latitude
     * lon: longitude
     * @carriers - Safaricom, Airtel, Telcom Kenya, Econet (Formerly YU)
     * @param {Request} req
     * @param {Response} res
     */

    public getCarrierBtsLocation(req: Request, res: Response): void {
        if (Validator.isValidCellData(req)) {
            switch (req.body.mnc) {
                case '2':
                    BtsSafaricomController.getBtsLatLon(req, res);
                    break;
                case '3':
                    BtsAirtelController.getBtsLatLon(req, res);
                    break;
                case '5':
                    BtsEconetController.getBtsLatLon(req, res);
                    break;
                case '7':
                    BtsTelcomController.getBtsLatLon(req, res);
                    break;
                default:
                    res.json({status: 204, success: false, message: 'Mobile Network Code (MNC) not found'});
            }
        }

    }

    /**
     * Get every carrier bts [KENYA] locations with cellids, lacs and sitenames
     * where applicable, by radius(lac range).
     * E.g a radius say 100 - 200(lac) will give all the basestations within
     * this range for a given carrier.
     * Typically the following will be returned on the response
     * object.
     * mcc: mobile country code
     * mnc: mobile network code
     * lac: location area code
     * cellid: cell tower id
     * lat: latitude
     * lon: longitude
     * @carriers - Safaricom, Airtel, Telcom Kenya, Econet (Formerly YU)
     * @param {Request} req
     * @param {Response} res
     */

    public getCarrierBtsByRange(req: Request, res: Response): void {
        if (Validator.isValidMnc(req)) {
            switch (req.body.mnc) {
                case '2':
                    BtsSafaricomController.getBtsByLacRange(req, res);
                    break;
                case '3':
                    BtsAirtelController.getBtsByLacRange(req, res);
                    break;
                case '5':
                    BtsEconetController.getBtsByLacRange(req, res);
                    break;
                case '7':
                    BtsTelcomController.getBtsByLacRange(req, res);
                    break;
                default:
                    res.json({status: 204, success: false, message: 'Mobile Network Code (MNC) not found'});

            }
        }
    }


}

export {Index};