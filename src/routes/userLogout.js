require('dotenv').config();
const express = require('express');

const router = express.Router();



router.get('/',  (req, res) => {
    res.send('userlogout');
})
/*
    destroys user session cookie,
    allowing user to logout

    when user logs out, their session key will be deleted
    this is to prevent unpriviledged users from accessing
    priviledged information.

*/
router.post('/', async (req, res) => {
    req.session.destroy(err=> {
        if(err) {
            console.log(err)
        }
        res.clearCookie(process.env.SESSION_NAME)
        res.redirect('/login')
    })
})

module.exports = router;