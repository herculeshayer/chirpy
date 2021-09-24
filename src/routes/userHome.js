const express = require('express');


const User = require('./../models/users');


const router = express.Router();

/*
    access priviledged information upon login.
        user info is shown as html as a visual aid  

*/

router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.userID });
        

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


module.exports = router;