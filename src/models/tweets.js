const mongoose = require('mongoose');

const TweetSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    tweets: [{
        tweet: {
            type: String,
            trim: true,
            minLength: 1,
            maxLength: 240,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }]
});

module.exports = mongoose.model('tweets', TweetSchema);

