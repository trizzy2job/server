const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votesSchema = new Schema({
    ipfs: {
        type: String,
        required: true
    },
    wallet: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('Votes', votesSchema);