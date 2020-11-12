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
    },
    rating: {
		type: Number,
        required: true,
        max: 10,
        min: 0,
    },
    review: {
        type: String,
        required: true,
	},
});

module.exports = mongoose.model('series', GameSchema);
