process.env.NODE_ENV = 'test';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`, silent: true });

const chai = require('chai');
const chaiHttp = require('chai-http');


const server = require('../app');
const { expect } = require('chai');


chai.should();
chai.use(chaiHttp);



/*
    what: HTTP test for routes /register & /login
    why: Test if users are able to register & login
        with appropriate data. 
*/
let data = {
    username: 'test',
    password: '123123',
    email: 'test@hot.ca'
}


describe('register POST & login POST test', () => {
    describe('send test user to server & receive success message', () => {
        it('should post new user', done => {
            chai.request(server)
                .post('/register')
                // .type('form')
                .send(data)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                done();
                })
        })
    })
    describe('login', () => {
        it('should login user', done => {
            chai.request(server)
                .post('/login')
                // .type('form')
                .send(data)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('message');
                done();
                })
        })
        it('redirect session user', done => {
            chai.request(server)
                .post('/login')
                .send({
                    username: 'notauser',
                    password: '123123',
                    email: 'notauser@hot.ca'
                })
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    // expect(err).to.be.null;
                    expect(res).to.redirect;
                done();
                })
        })
        it('should not login user: incorrect endpoint', done => {
            chai.request(server)
                .post('/logogogo')
                .send(data)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(404);
                    
                    
                done();
                })
        })
    })

})