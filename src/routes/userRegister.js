const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/users');



//Get all users
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
            // return res.json({message: })
        });
        // console.log(addNewUser)
        // res.json({message: addNewUser})
        // res.redirect('/home')
        // return res.json( { user : addNewUser } )
        // const usernameDB = await User.findOne( { username: `${req.body.username}` });
        // console.log(usernameDB);
        // if(usernameDB) {
        //     req.session.userID = usernameDB._id.toString();
        //     console.log(req.session.userID);
        //     return res.json({ session: req.session }); //rememeber to redirect to homepage
        // } else {
        //     return res.redirect('/register');
        // }
        return res.redirect('/login');
        // console.log(addNewUser)
        // res.status(201).json(addNewUser);
    } catch (error) {
        if(error.code === 11000) {
            console.log('hit');
            res.json({message: 'User already exists'})
        }
        throw error;
        // res.status(400).json({message: error});
    }
})

module.exports = router;