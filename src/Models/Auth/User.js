const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;