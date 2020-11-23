const mongoose = require("mongoose");

const Role = mongoose.model(
	"Role",
	new mongoose.Schema({
		name: {
			type: String,
			required: [true, "can't be blank"]
		}
	})
);

module.exports = Role;