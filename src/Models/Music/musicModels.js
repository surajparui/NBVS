const mongoose = require('mongoose');
const musicSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true
    },
    Music: {
        type: String,
        required: true
    }
})