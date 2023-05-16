const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    wallet: {
        type: String,
        required: true
    },
    votes: {
        type: Array,
        required: true
    },
    submissions: {
        type: Array,
        required: true
    },
    orders: {
        type: Array,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);