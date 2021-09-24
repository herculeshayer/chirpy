const router = require('express').Router();

const { text } = require('express');
const Chat = require('../models/chat');
const Users = require('./../models/users');

/**
 *      GET all user messages made 
 */

router.get('/', async (req, res) => {
    try {
        const { userID } = req.session;

        const userDirectMessages = await Chat.find({ userID : userID});

        res.status(200).json({messages: userDirectMessages})
        
    } catch (error) {
       res.status(500).json({message: `Error: ${error}`}); 
    }
})

/**
 *      Query the database for a recipient, if the recipient doesn't exist, respond with 404
 *          if recipient DOES exist, check if user has sent them a message before,
 *              if message hasn't been sent, create index w/ userID, recipient, and text
 *              if message has been sent, push recipient + text into messages array
 * 
 */

router.post('/', async (req, res) => {
    
    try {
        const userID = req.session.userID;

        const recipientUsername = await Users.findOne({ username: req.body.messages[0].recipient});
        // console.log(req.body.messages[0].recipient)
        console.log(recipientUsername)
        if(!recipientUsername) {
            return res.status(404).json({message: "User does not exist, please try again"});
        }
        const newChat = new Chat({
            userID: userID,
            messages: [
                {
                    recipient: recipientUsername,
                    text: req.body.text
                }
            ]
        });
        const exists = await Chat.findOne({ userID : userID });
        
        if(exists) {
            const addMessage = await Chat.findOneAndUpdate(userID, {
                $push: {
                    messages: req.body.messages
                }
            })
            return res.status(201).json({ message: 'Message Sent', message: addMessage });
        } else {
            const userMessage = await newChat.save();
        
            if(userMessage) {
                return res.status(201).json({message: "Message Successfully Sent!"});
            }
        }
    } catch (error) {

        res.status(500).json({message: `Error: ${error}`})

    }
})

module.exports = router;