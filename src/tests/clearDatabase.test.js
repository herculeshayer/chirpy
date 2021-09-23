process.env.NODE_ENV = 'test';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`, silent: true });

const Users = require('../models/users');

beforeEach(done => {
    Users.deleteMany({}, err => {
        if(err) {
            console.log(err);
        }
    })
    done();
})

afterEach(done => {
    Users.deleteMany({}, err => {
        if(err) {
            console.log(err);
        }
    })
    done();
})