const router = require('express').Router();

const Tweets = require('../models/tweets');

const { redirectLogin }= require('./../middleware/redirect')

router.get('/', async (req, res) => {
    const userID = req.session.userID;
    try {
        // console.log(userID);
        const userTweets = await Tweets.find({ userID : userID })
        console.log(userTweets[0].tweets[12].tweet)
        res.status(200).json({
            tweet: userTweets[0].tweets
        })
    } catch (error) {
        if(error) {
            res.status(500).json({ message: "Can't retrieve tweets", error: error })
        }
    }
    
})

/*
    recieve tweet from user
        if the user hasn't made any tweets, it'll add user + their tweet
    
    tweets are saved in an array with:
        _id, tweet, date
*/

router.post('/', async (req, res) => {
    const userID = req.session.userID;
    const { tweet } = req.body.tweets;
    const newTweet = new Tweets({
        userID: userID,
        tweets: req.body.tweets
    })
    try {
        const exists = await Tweets.findOne({ userID : userID })
        // console.log(exists);
        if(exists) {
            const addTweet = await Tweets.findOneAndUpdate(userID, {
                $push: {
                    tweets: req.body.tweets
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