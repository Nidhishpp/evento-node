const mongoose = require("mongoose");

const Booking = mongoose.model(
	"Booking",
	new mongoose.Schema({
		address_line_1: {
			type: String,
			required: [true, "can't be blank"],
		},
		address_line_2: {
			type: String,
			required: [true, "can't be blank"],
		},
		city: {
			type: String,
			required: [true, "can't be blank"],
		},
		state: {
			type: String,
			required: [true, "can't be blank"],
		},
		pincode: {
			type: Number,
			required: [true, "can't be blank"],
		},
		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
		},
		event_name: {
			type: String,
			required: [true, "can't be blank"],
		},
		package: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event.Package",
		},
		package_name: {
			type: String,
			required: [true, "can't be blank"],
		},
		start_date: {
			type: Date,
			required: [true, "can't be blank"],
		},
		end_date: {
			type: Date,
			required: [true, "can't be blank"],
		},
		approx_count: {
			type: Number,
			required: [true, "can't be blank"],
		},
		hall: {
			type: Boolean,
			required: [true, "can't be blank"],
		},
		message: {
			type: String,
			required: [true, "can't be blank"]
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		status: {
			type: String,
			required: [true, "can't be blank"]
		},
	})
);

module.exports = Booking;