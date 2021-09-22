const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/users');


const router = express.Router();

/*
    access priviledged information upon login.
    users 

*/

router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.userID });
        // console.log(req.session)
        // console.log(user);

        res.send(`
        <h1>Home</h1>
        <ul>
            <li>Name: ${user.username}</li>
            <li>Email: ${user.email}</li>
        </ul>
        `)
    } catch (error) {
        res.status(500).json({message: error });
    }

    
})
router.post('/', async (req, res) => {
    
})

module.exports = router;