const mongoose = require("mongoose");

const Package = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "can't be blank"],
	},
	features: {
		type: Array,
		required: [true, "can't be blank"],
	},
	price: {
		type: Number,
		required: [true, "can't be blank"],
	},
});

const Event = mongoose.model(
	"Event",
	new mongoose.Schema({
		title: {
			type: String,
			required: [true, "can't be blank"],
		},
		slug: {
			type: String,
			required: [true, "can't be blank"],
		},
		image: {
			type: String,
			required: [true, "can't be blank"],
		},
		description: {
			type: String,
			required: [true, "can't be blank"],
		},
		featured: {
			type: Boolean,
			required: [true, "can't be blank"],
		},
		gallery: {
			type: Array,
			required: [true, "can't be blank"]
		},
		packages: [Package]
	})
);

module.exports = Event;