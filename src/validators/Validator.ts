import {Request} from "express";

class Validator {
    constructor() {

    }

    public isValidMnc(req: Request): boolean {
        if ((req.body.mnc != null && req.body.mnc > 0)) {
            return true;
        }
        return false;
    }

    public isValidateRequest(req: Request): boolean {
        if ((req.body.mcc != null && req.body.mcc != 0) && (req.body.mnc != null && req.body.mnc != 0) && (req.body.lac != null && req.body.lac != 0) && (req.body.cellid != null && req.body.cellid != 0)) {
            return true;
        }
        return false;
    }

    public isValidCellData(req: Request): boolean {
        if ((req.body.mcc != null && req.body.mcc != 0) && (req.body.mnc != null && req.body.mnc != 0) && (req.body.lac != null && req.body.lac != 0) && (req.body.cellid != null && req.body.cellid != 0)) {
            return true;
        }
        return false;
    }

    public isValidateRange(req: Request): boolean {
        if ((req.body.from != null && req.body.from != 0) && (req.body.to != null && req.body.to != 0)) {
            if (!isNaN(req.body.from) && !isNaN(req.body.to) && (req.body.from != req.body.to)) {
                return true;
            }
        }
        return false;
    }

    public isValidEmail(email: string): boolean {
        const re = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        return re.test(email);
    }

    public getBestTowerMatch(data): Promise<any> {
        return new Promise((resolve, reject) => {
            let bestMatch = [];
            if (data.length > 0) {
                if (data.length == 1) {
                    resolve(data);
                }
                if (data.length >= 2) {
                    for (let i in data) {
                        if (data[i].siteid != null) {
                            bestMatch.push(data[i]);
                            resolve(bestMatch);
                            break;
                        } else {
                            bestMatch.push(data[i]);
                            resolve(bestMatch);
                            break;
                        }
                    }
                }
            }
            reject(new Error('No data available'));
        });
    }
}

export default new Validator();