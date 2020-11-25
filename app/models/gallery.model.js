const mongoose = require("mongoose");

const Gallery = mongoose.model(
	"Gallery",
	new mongoose.Schema({
		title: {
			type: String,
			required: [true, "can't be blank"],
		},
		image: {
			type: String,
			required: [true, "can't be blank"],
		},
		featured: {
			type: Boolean,
			required: [true, "can't be blank"],
			default: false
		}
	})
);

module.exports = Gallery