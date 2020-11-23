const db = require("../models");
const Profile = db.profile;
const User = db.user;
const Role = db.role;

exports.show = (req, res) => {
	Profile.findOne({
			user: req.userId
		})
		.populate("user", "-__v")
		.exec((err, profile) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			if (!profile) {
				return res.status(404).json({
					message: "User Not found."
				});
			}

			var query = {
				_id: {
					$in: profile.user.roles
				}
			};

			Role.find(query).exec((err, roles) => {
				if (err) {
					res.status(500).json({
						err
					});
					return;
				}

				var authorities = [];
				for (let i = 0; i < roles.length; i++) {
					authorities.push(roles[i].name);
				}

				res.status(200).json({
					roles:authorities,
					name:profile.first_name,
					last_name:profile.last_name,
					email:profile.email,
					phone:profile.phone,
					avatar:profile.avatar,
					introduction:"Admin"
				});
			})

		});
};

exports.update = (req, res) => {

	const user = {
		user: req.userId
	}

	const id = {
		_id: req.userId
	}


	var newvalues = {
		$set: {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			phone: req.body.phone
		}
	};

	var uservalues = {
		$set: {
			username: req.body.first_name
		}
	};

	Profile.updateOne(user, newvalues, (err, profile) => {
		if (err) {
			res.status(500).json({
				message: "Error updating profile"
			});
			return;
		} else {
			User.updateOne(id, uservalues, (err, user) => {
				if (err) {
					res.status(500).json({
						message: "Error updating profile"
					});
					return;
				} else {
					res.status(200).json(profile)
				}

			});
		}

	});



};