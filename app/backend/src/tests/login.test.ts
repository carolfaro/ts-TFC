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
    it('Endpoint POST/login- o avaliador verificará que é possível realizar um login com sucesso', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({ 
            email:"admin@admin.com", 
            password:"$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" 
        });
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.have.property('token');
    });
    it('Endpoint POST/login- o avaliador verificará que retorna mensagem de erro ao receber email inválido', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({ 
            email:"admi@admin.com", 
            password:"yyyyy" 
        });
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.have.property('message');
    });
    it('Endpoint POST/login- o avaliador verificará que retorna mensagem de erro ao receber senha inválida', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({ 
            email:"admin@admin.com", 
            password:"yyyyy" 
        });
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.have.property('message');
    });
  });