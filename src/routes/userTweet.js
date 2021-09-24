const router = require('express').Router();

const Tweets = require('../models/tweets');

const { redirectLogin }= require('./../middleware/redirect');



/**
 * Display all tweets made by user
 */

router.get('/', async (req, res) => {
    const userID = req.session.userID;
    try {
        
        const userTweets = await Tweets.find({ userID : userID });
        
        res.status(200).json({
            tweet: userTweets[0].tweets
        });
    } catch (error) {

        res.status(500).json({ message: "Can't retrieve tweets", error: error });

    }
    
})
/**
 * GET: single tweet by params.id from users array of tweets
 */

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userID } = req.session;

        const userOfTweets = await Tweets.find({ userID : userID });
        const allTweetsMadeByUser = userOfTweets[0].tweets;
        

        let oneTweet;
        for(let i = 0; i < allTweetsMadeByUser.length; i++) {
            if(allTweetsMadeByUser[i]._id.toString() === id) {
                oneTweet = allTweetsMadeByUser[i];
                break;
            }
        }
       
        res.status(200).json({tweet: oneTweet});

    } catch (error) {

        res.status(500).json({message: `Error: ${error}`});

    }
})

/**
 * recieve tweet from user      
 *      if the user hasn't made any tweets, it'll add user + their tweet
 *      if user has tweeted, it'll push the new tweet into an array
 * 
 * tweets are saved in an array with:
 *      _id, tweet, date
 */

router.post('/', async (req, res) => {
    const userID = req.session.userID;
    
    const newTweet = new Tweets({
        userID: userID,
        tweets: req.body.tweets
    });

    try {
        const exists = await Tweets.findOne({ userID : userID });
        
        if(exists) {
            const addTweet = await Tweets.findOneAndUpdate(userID, {
                $push: {
                    tweets: req.body.tweets
                }
            })
            res.status(201).json({ message: 'Tweet Added', tweet: addTweet });
        } else {
            const userTweet = await newTweet.save();
        
            if(userTweet) {
                res.status(201).json({message: "Tweet Successfully Added!"});
            }
        }
    } catch (error) {

        res.status(500).json({message: `Error: ${error}`})

    }
})

/**
 *  Find tweet made by user by ID and update
 * 
 */

router.patch('/:id', async (req,res) => {
    const { tweet } = req.body;
    const { userID } = req.session;
    const { id } = req.params;

    try {
        console.log(tweet, userID, id);
        const usersTweets = await Tweets.findOneAndUpdate({
            userID : userID,
        }, {
            $set: {
                tweets: {
                    tweet : tweet
                }
            }
        })

        res.status(200).json({tweet: usersTweets})


    } catch (error) {

        res.status(500).json({message: `Error: ${error}`})

    }
})

/**
 * Delete user
 * Tweet
 */

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { userID } = req.session;

    try {
        
    } catch (error) {
        
    }
})

module.exports = router;