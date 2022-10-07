import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Team from   '../database/models/Team';

chai.use(chaiHttp);

const {expect} = chai;

const teamsMock = [
    { id: 1, teamName: 'aaa'},
    { id: 2, teamName: 'bbb'},
    { id: 3, teamName: 'ccc'}
];

describe('Testes de integração - Seção 2: Teams', () => {
   
    let chaiHttpResponse: Response;


  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves([...teamsMock] as Team[]);
  });

  after(()=>{
    sinon.restore();
  })

    it('Endpoint /teams- o avaliador verificará que é possível retornar todos os times corretamente', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams');
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.have.property('teamName');
    });
    // });
  
    // it('Seu sub-teste', () => {
    //   expect(false).to.be.eq(true);
    // });
  });