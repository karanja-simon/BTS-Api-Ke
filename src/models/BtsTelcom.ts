import {Schema, model} from 'mongoose';

let BtsTelcomSchema: Schema = new Schema({
    mcc: {type: Number, default: 0},
    mnc: {type: Number, default: 0},
    lac: {type: Number, default: 0},
    lat: {type: Number, default: 0},
    lon: {type: Number, default: 0},
    cellid: {type: Number, default: 0},
    siteid: {type: Number, default: 0},
    sitename: {type: String, default: ''},
    radio_type: {type: String, default: ''}
}, { collection: 'bts_telcom' });


export default model('BtsTelcom', BtsTelcomSchema);