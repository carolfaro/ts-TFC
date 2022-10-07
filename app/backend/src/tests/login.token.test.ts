import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import { app } from '../app';
import { Response } from 'superagent';
import User from   '../database/models/User';

chai.use(chaiHttp);

const {expect} = chai;

const userLoginMock = 
{email: 'admin@admin.com',
password: bcrypt.hashSync('xxxx')};

const userLoginPasswordMock = {
  email: 'admin@admin.com',
  password: 'xxxx',
}

const userWithNoEmail = {
  email: '',
  password: 'xxxx',
}

describe('Testes de integração - Seção 1.2: Login', () => {
   
    let chaiHttpResponse: Response;


  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userLoginMock as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

    it('Endpoint /login - se dados corretos, deve retornar JWT token com sucesso', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(userLoginPasswordMock)
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body).to.have.property('token');
    });
  });

  describe('Testes de integração - Seção 1.3: Login', () => {
   
    let chaiHttpResponse: Response;


  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves((null as unknown as User));
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

    it('Endpoint /login - se email inserido estiver incorreto, retorna status 401 e messagem de erro', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(userLoginPasswordMock)
        expect(chaiHttpResponse).to.have.status(401);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse).to.be.json;
    });
  });


  describe('Testes de integração - Seção 1.4: Login', () => {
   
    let chaiHttpResponse: Response;

    it('Endpoint /login - se o campo de email não estiver inserido retorna status 400 e mensagem de erro', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(userWithNoEmail)
        expect(chaiHttpResponse).to.have.status(400);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse).to.be.json;
    });
  });