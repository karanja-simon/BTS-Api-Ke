import {Request, Response, NextFunction} from 'express';
import Validator from './../validators/Validator';

import EconetBts from '../models/BtsEconet';

class BtsEconetController {

    constructor() {

    }

    public getAllBts(req: Request, res: Response): void {
        console.log('Get Econet BTS invoked');
        EconetBts.find({})
            .then((data) => {
                if (data.length < 1) {
                    res.json({
                        status: 204,
                        success: false,
                        data: 'No lat-lon found for the range provided'
                    });
                } else {
                    res.json({status: 200, success: true, data: data});
                }
            }, (err) => {
                res.json({
                    success: false,
                    error: err
                })
            });
    }


    public getBtsByLacRange(req: Request, res: Response): void {
        if (Validator.isValidateRange(req)) {
            EconetBts.find({lac: {$lte: req.body.to, $gte: req.body.from}})
                .then((data) => {
                    if (data.length < 1) {
                        res.json({
                            status: 204,
                            success: false,
                            data: 'No lat-lon found for the range provided'
                        });
                    } else {
                        res.json({status: 200, success: true, data: data});
                    }
                }, (err) => {
                    res.json({success: false, error: err})
                });
        } else {
            res.json({status: 204, success: false, message: 'Invalid range'});

        }
    }

    public getBtsLatLon(req: Request, res: Response): void {
        if (Validator.isValidateRequest(req)) {
            EconetBts.find({mcc: req.body.mcc, mnc: req.body.mnc, lac: req.body.lac, cellid: req.body.cellid})
                .then((data) => {
                    if (data.length < 1) res.json({
                        status: 204,
                        success: false,
                        data: 'No lat-lon found for the cell tower'
                    });
                    if (data.length >= 1) {
                        Validator.getBestTowerMatch(data).then((match) => {
                            res.json({status: 200, success: true, data: match});
                        }).catch((err) => {
                            res.json({status: 500, success: false, message: err});
                        });
                    }
                }, (err) => {
                    res.json({
                        status: 500,
                        success: false,
                        error: err
                    })
                });
        } else {
            res.json({success: false, message: 'some fields missing'});
        }
    }

}

export default new BtsEconetController();