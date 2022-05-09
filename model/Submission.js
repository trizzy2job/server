const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    wallet: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    ipfs: {
        type: String,
        required: true
    },
    royalty: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('Submissions', submissionSchema);