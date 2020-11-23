const mongoose = require("mongoose");

const Profile = mongoose.model(
	"Profile",
	new mongoose.Schema({
		first_name: {
			type: String,
			required: [true, "can't be blank"],
			match: [/^[a-zA-Z0-9]+$/, 'is invalid']
		},
		last_name: {
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
		avatar: {
			type: String,
			default: 'http://localhost:8080/uploads/avatar/ryan.jpg'
		},
		phone: {
			type: String,
			required: [true, "can't be blank"],
			match: [/^[0-9]+$/, 'is invalid']
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	})
);

module.exports = Profile;