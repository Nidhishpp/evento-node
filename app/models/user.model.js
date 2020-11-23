const mongoose = require("mongoose");

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		username: {
			type: String,
			required: [true, "can't be blank"],
			match: [/^[a-zA-Z0-9]+$/, 'is invalid']
		},
		email: {
			type: String,
			lowercase: true,
			required: [true, "can't be blank"],
			match: [/\S+@\S+\.\S+/, 'is invalid']
		},
		password: String,
		roles: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role"
		}]
	})
);

module.exports = User;