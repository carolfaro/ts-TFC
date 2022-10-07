import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import User from   '../database/models/User';

chai.use(chaiHttp);

const {expect} = chai;

describe('Testes de integração - Seção 1: Login', () => {
   
    let chaiHttpResponse: Response;
    it('Endpoint /login- o avaliador verificará que é possível realizar um login com sucesso', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({ 
            user:"xxxx", 
            password:"yyyyy" 
        });
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.have.property('token');
    });
    // });
  
    // it('Seu sub-teste', () => {
    //   expect(false).to.be.eq(true);
    // });
  });