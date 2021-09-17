const express = require('express');
const router = express.Router();

const User = require('../models/users');

router.get('/', async ( req , res ) => {
    // console.log(users.findById(req.params.id));
    try {
        const userList = await User.find();
        res.status(200).json(userList);
    } catch (error) {
        throw error;
    }
    // res.send('userRegister');
})

router.post('/', ( req, res ) => {
    const { username, email, password } = req.body;
    const newUser = new User({
        username: username,
        email: email,
        password: password
    })
    try {
        const addNewUser = newUser.save();
        res.status(201).json(addNewUser);
    } catch (error) {
        res.status(400).json({message: error});
        throw error;
    }
})

module.exports = router;