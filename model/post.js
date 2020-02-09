var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    Character: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    way: {
        type: String,
        required: true
    },
    Money: {
        type: Number,
        required: true
    },
    instID: {
        type: String,
        required: true
    },
    run: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('raid', PostSchema)