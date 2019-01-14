process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import App from './../src/server';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', ()=> {
   it('should be json', () => {
       return chai.request(App).get('/')
           .then((res) => {
               expect(res.type).to.eql('application/json');
           })
   });

   it('should have a message', () => {
      return chai.request(App).get('/')
           .then((res) => {
               expect(res.status).to.equal(200);
               expect(res).to.be.json;
               expect(res.body.success).to.be.true;
           }) ;
   });
});