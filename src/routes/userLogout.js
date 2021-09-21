require('dotenv').config();
const express = require('express');

const router = express.Router();



router.get('/',  (req, res) => {
    res.send('userlogout');
})
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