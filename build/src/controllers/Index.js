"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = require("./../validators/Validator");
const BtsSafaricom_1 = require("../controllers/BtsSafaricom");
const BtsAirtel_1 = require("../controllers/BtsAirtel");
const BtsEconet_1 = require("../controllers/BtsEconet");
const BtsTelcom_1 = require("../controllers/BtsTelcom");
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
    getCarrierBts(req, res) {
        if (Validator_1.default.isValidMnc(req)) {
            switch (req.body.mnc) {
                case '2':
                    BtsSafaricom_1.default.getAllBts(req, res);
                    break;
                case '3':
                    BtsAirtel_1.default.getAllBts(req, res);
                    break;
                case '5':
                    BtsEconet_1.default.getAllBts(req, res);
                    break;
                case '7':
                    BtsTelcom_1.default.getAllBts(req, res);
                    break;
                default:
                    res.json({ status: 204, success: false, message: 'Mobile Network Code (MNC) not found' });
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
    getCarrierBtsLocation(req, res) {
        if (Validator_1.default.isValidCellData(req)) {
            switch (req.body.mnc) {
                case '2':
                    BtsSafaricom_1.default.getBtsLatLon(req, res);
                    break;
                case '3':
                    BtsAirtel_1.default.getBtsLatLon(req, res);
                    break;
                case '5':
                    BtsEconet_1.default.getBtsLatLon(req, res);
                    break;
                case '7':
                    BtsTelcom_1.default.getBtsLatLon(req, res);
                    break;
                default:
                    res.json({ status: 204, success: false, message: 'Mobile Network Code (MNC) not found' });
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
    getCarrierBtsByRange(req, res) {
        if (Validator_1.default.isValidMnc(req)) {
            switch (req.body.mnc) {
                case '2':
                    BtsSafaricom_1.default.getBtsByLacRange(req, res);
                    break;
                case '3':
                    BtsAirtel_1.default.getBtsByLacRange(req, res);
                    break;
                case '5':
                    BtsEconet_1.default.getBtsByLacRange(req, res);
                    break;
                case '7':
                    BtsTelcom_1.default.getBtsByLacRange(req, res);
                    break;
                default:
                    res.json({ status: 204, success: false, message: 'Mobile Network Code (MNC) not found' });
            }
        }
    }
}
exports.Index = Index;
//# sourceMappingURL=Index.js.map