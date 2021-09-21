const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');

const router = express.Router();

const redirectHome = (req, res, next) => {
    if(req.session.userID) {
        res.redirect('/home')
    } else {
        next();
    }
}


router.get('/', redirectHome, (req, res) => {
    res.send(req.session.userID);
})
router.post('/', redirectHome, async (req, res) => {
    const { username, password: plainTextPassword } = req.body;
    console.log(req.session);
    try {
        const user = await User.findOne({ username: `${username}`});
        console.log(user)
        if(user) {
            if(await bcrypt.compare(plainTextPassword, user.password)) {
                req.session.userID = user._id
                // console.log(req.session.userID)
                return res.json({session: req.session})
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        throw error;
    }
    
})

module.exports = router;