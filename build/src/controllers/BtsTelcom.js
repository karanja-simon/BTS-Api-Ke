"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = require("./../validators/Validator");
const BtsTelcom_1 = require("../models/BtsTelcom");
class BtsTelcomController {
    constructor() {
    }
    getAllBts(req, res) {
        BtsTelcom_1.default.find({})
            .then((data) => {
            if (data.length < 1) {
                res.json({
                    status: 204,
                    success: false,
                    data: 'No lat-lon found for the range provided'
                });
            }
            else {
                res.json({ status: 200, success: true, data: data });
            }
        }, (err) => {
            res.json({
                success: false,
                error: err
            });
        });
    }
    getBtsByLacRange(req, res) {
        if (Validator_1.default.isValidateRange(req)) {
            BtsTelcom_1.default.find({ lac: { $lte: req.body.to, $gte: req.body.from } })
                .then((data) => {
                if (data.length < 1) {
                    res.json({
                        status: 204,
                        success: false,
                        data: 'No lat-lon found for the range provided'
                    });
                }
                else {
                    res.json({ status: 200, success: true, data: data });
                }
            }, (err) => {
                res.json({ success: false, error: err });
            });
        }
        else {
            res.json({ status: 204, success: false, message: 'Invalid range' });
        }
    }
    getBtsLatLon(req, res) {
        if (Validator_1.default.isValidateRequest(req)) {
            BtsTelcom_1.default.find({ mcc: req.body.mcc, mnc: req.body.mnc, lac: req.body.lac, cellid: req.body.cellid })
                .then((data) => {
                if (data.length < 1)
                    res.json({
                        status: 204,
                        success: false,
                        data: 'No lat-lon found for the cell tower'
                    });
                if (data.length >= 1) {
                    Validator_1.default.getBestTowerMatch(data).then((match) => {
                        res.json({ status: 200, success: true, data: match });
                    }).catch((err) => {
                        res.json({ status: 500, success: false, message: err });
                    });
                }
            }, (err) => {
                res.json({
                    status: 500,
                    success: false,
                    error: err
                });
            });
        }
        else {
            res.json({ success: false, message: 'some fields missing' });
        }
    }
}
exports.default = new BtsTelcomController();
//# sourceMappingURL=BtsTelcom.js.map