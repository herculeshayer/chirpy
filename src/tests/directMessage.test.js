process.env.NODE_ENV = 'test';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`, silent: true });

const chai = require('chai');
const chaiHttp = require('chai-http');


const server = require('../app');
const { expect } = require('chai');


chai.should();
chai.use(chaiHttp);


describe('test chat GET && POST', ()=> {
    describe('GET chat', () => {
        it('GET message sent to user', done => {
            chai.request(server)
                .get('/home/chat')
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(200);

                    done();
                })
        })

        it('Should not GET message from user', done => {
            chai.request(server)
            .get('/home/incorrection-endpoint')
            .end((err, res) => {
                if(err) {
                    console.log(err);
                }
                res.should.have.status(404);

                done();
            })
        })
    })

//     describe('POST chat message to user', () => {
//         it('send message to user', done => {
//             let data = JSON.stringify({
//                 messages: [
//                     {
//                         recipient: "megan",
//                         text: "are you there megan?"
//                     }
//                 ]
//             })
            
//             chai.request(server)
//                 .post('/home/chat')
//                 .send(data)
//                 .end((err, res) => {
//                     if(err) {
//                         console.log(err);
//                     }
//                     expect(res).to.have.a.status(201);
//                     done();
//                 })

//         })
//     })
})