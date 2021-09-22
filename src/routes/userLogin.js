const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const { redirectHome } = require('../middleware/redirect');

const router = express.Router();

/*
    a request for login is sent
        username & password is compared to Users database
        a userID is assigned to the session cookie
    if the user is not present in database, client is routed to /register
*/

router.get('/',  (req, res) => {
res.json({ sesh: req.session });
})


router.post('/', redirectHome, async (req, res) => {
    const { username, password: plainTextPassword } = req.body;
    try {
        const user = await User.findOne({ username: `${username}`});
        if(user) {
            if(await bcrypt.compare(plainTextPassword, user.password)) {
                req.session.userID = user._id.toString();
                return res.status(200).json({message: "Login Successful"});
            }
        } else {
            res.redirect('/register');
        }
    } catch (error) {
        throw error;
    }
    
})

module.exports = router;