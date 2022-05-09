const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    name:{
        type: String,
        require: true
    },
    delivered: {
        type: Boolean,
        require: true
    },
    wallet: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('Order', orderSchema);