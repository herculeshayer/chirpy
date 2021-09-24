const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    toUser: {
        type: String,
        required: true
    },
    fromUser: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        trim: true
    }
})

module.exports = mongoose.model('direct-messages', chatSchema);