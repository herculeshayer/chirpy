const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    messages: [{
        recipient: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
            trim: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }]
    
})

module.exports = mongoose.model('chat', chatSchema);