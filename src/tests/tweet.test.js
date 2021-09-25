process.env.NODE_ENV = 'test';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`, silent: true });

const chai = require('chai');
const chaiHttp = require('chai-http');


const server = require('../app');
const { expect } = require('chai');


chai.should();
chai.use(chaiHttp);


// describe('POST Tweet', () => {
//     it('POST a single tweet to database', done => {
//         let data = JSON.stringify({
//             tweets : [
//                 {
                    
//                     text: "are you there megan?"
//                 }
//             ]
//         })
//         chai.request(server)
//             .post('/home/tweet')
//             .send(data)
//             .end((err,res) => {
//                 if(err) {
//                     console.log(err);
//                 }
//                 res.should.have.status(201);
//                 done();
//             })
//     })
// })
// describe('GET Tweet', () => {
//     it('GET a single tweet from collection', done => {
//         chai.request(server)
//             .get('/home/tweet')
//             .end((err,res) => {
//                 if(err) {
//                     console.log(err)
//                 }
//                 res.should.have.status(200);
//                 // res.body.should.be.a('object') | res.body.should.be.a('array');

//                 done();
//             })
//     })
// })
