"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
const chai = require("chai");
const chaiHttp = require("chai-http");
const server_1 = require("./../src/server");
chai.use(chaiHttp);
const expect = chai.expect;
describe('baseRoute', () => {
    it('should be json', () => {
        return chai.request(server_1.default).get('/')
            .then((res) => {
            expect(res.type).to.eql('application/json');
        });
    });
    it('should have a message', () => {
        return chai.request(server_1.default).get('/')
            .then((res) => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body.success).to.be.true;
        });
    });
});
//# sourceMappingURL=btslocation.test.js.map