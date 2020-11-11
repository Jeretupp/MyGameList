const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    playtime: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Games', GameSchema)