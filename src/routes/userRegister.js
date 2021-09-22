const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/users');


//Get all users
router.get('/', async ( req , res ) => {
    try {
        const userList = await User.find();
        res.status(200).json(userList);
    } catch (error) {
        throw error;
    }
})

/*
    new user is created following User model
    password is hashed using bcryptjs
        password is saved to users database
*/
router.post('/', async ( req, res ) => {
    const { username, email, password: plainTextPassword } = req.body;
    if(plainTextPassword.length < 6) {
        res.json({message: "Password length needs to be greater than 5."})
    }
    try {
        const password = await bcrypt.hash(plainTextPassword, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: password
        })
        const addNewUser = await newUser.save((err) => {
            if(err) {
                return res.send(err)
            }
            console.log("User Successfully Created!");
            
        });
        
        
        res.status(201).json({message: 'User Successfully Created!', status: addNewUser})
        
    } catch (error) {
        res.status(500).json({error: error})
        
    }
})

module.exports = router;