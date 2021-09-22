const chai = require('chai');
const chaiHttp = require('chai-http');

const mocha = require('mocha');
const testDB = require('./../models/test')

const server = require('../app')

chai.should();
chai.use(chaiHttp);

/*
    what: HTTP test for routes /register & /login
    why: Test if users are able to register & login
        with appropriate data. 
*/

describe('register POST & login POST test', () => {
    describe('register', () => {
        beforeEach(async (done) => {
            const deletedUser = await testDB.deleteOne({ username: "test" });
            console.log(deletedUser);
            done();
        })
        it('should post new user', done => {
            chai.request(server)
                .post('/register')
                .send({
                    username: 'test',
                    password: '123123',
                    email: 'test@hot.ca'
                })
                .end((err, res) => {
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
                .send({
                    username: 'test',
                    password: '123123',
                    email: 'test@hot.ca'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                done();
                })
        })
        it('should not login user', done => {
            chai.request(server)
                .post('/logogogo')
                .send({
                    username: 'test',
                    password: '123123',
                    email: 'test@hot.ca'
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    
                    
                done();
                })
        })
    })

})