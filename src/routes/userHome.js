const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const redirectLogin = (req, res, next) => {
    if(!req.session.userID) {
        res.redirect('/login')
    } else {
        next();
    }
}

router.get('/', redirectLogin, (req, res) => {
    res.send('home');
})
router.post('/', async (req, res) => {
    
})

module.exports = router;