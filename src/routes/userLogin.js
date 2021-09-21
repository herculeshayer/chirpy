const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');

const router = express.Router();


router.get('/',  (req, res) => {
res.json({ sesh: req.session });
})
router.post('/', async (req, res) => {
    const { username, password: plainTextPassword } = req.body;
    // console.log(req.session);
    try {
        const user = await User.findOne({ username: `${username}`});
        // console.log(user._id.toString());
        if(user) {
            if(await bcrypt.compare(plainTextPassword, user.password)) {
                req.session.userID = user._id.toString();
                // console.log(req.session.userID);
                return res.json({sesh: req.session});
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        throw error;
    }
    
})

module.exports = router;