const router = require('express').Router();

const Tweets = require('../models/tweets');



router.get('/', (req, res) => {
    
    res.send(req.session.userID)
})

router.post('/', async (req, res) => {
    const userID = req.session.userID;
    const { tweet } = req.body;
    const newTweet = new Tweets({
        userID: userID,
        tweets: tweet.toString()
    })
    try {
        const exists = await Tweets.findOne({ userID : userID })
        // console.log(exists);
        if(exists) {
            const addTweet = await Tweets.findOneAndUpdate(userID, {
                $push: {
                    tweet: tweet.toString(),
                }
            })
            res.status(201).json({ message: 'Tweet Added', tweet: addTweet })
        } else {
            const userTweet = await newTweet.save();
        
            if(userTweet) {
                res.status(201).json({message: "Tweet Successfully Added!"})
            }
        }
        
        
    } catch (error) {
        res.status(500).json({message: `Error: ${error}`})
    }
})

module.exports = router;