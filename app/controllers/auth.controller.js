const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Profile = db.profile;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
	const user = new User({
		username: req.body.first_name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	});

	user.save((err, user) => {
		if (err) {
			res.status(500).json({
				message: err
			});
			return;
		}

		if (req.body.roles) {
			Role.find({
					name: {
						$in: req.body.roles
					}
				},
				(err, roles) => {
					if (err) {
						res.status(500).json({
							message: err
						});
						return;
					}

					user.roles = roles.map(role => role._id);
					user.save(err => {
						if (err) {
							res.status(500).json({
								message: err
							});
							return;
						}
					});
				}
			);
		} else {
			Role.findOne({
				name: "user"
			}, (err, role) => {
				if (err) {
					res.status(500).json({
						message: err
					});
					return;
				}

				user.roles = [role._id];
				user.save(err => {
					if (err) {
						res.status(500).json({
							message: err
						});
						return;
					}
				});
			});
		}
	});

	
	const profile = new Profile({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		phone: req.body.phone,
		user: user._id,
	});

	profile.save((err, events) => {
		if (err) {
			user.deleteOne();

			res.status(500).json({
				message: err
			});
			return;
		} else {
			res.status(200).json({
				message: "User was registered successfully!"
			})
		}

	});
};

exports.signin = (req, res) => {
	User.findOne({
			email: req.body.email
		})
		.populate("roles", "-__v")
		.exec((err, user) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			if (!user) {
				return res.status(404).json({
					message: "User Not found."
				});
			}

			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).json({
					accessToken: null,
					message: "Invalid Password!"
				});
			}

			var token = jwt.sign({
				id: user.id
			}, config.secret, {
				expiresIn: 86400 // 24 hours
			});

			var authorities = [];

			for (let i = 0; i < user.roles.length; i++) {
				authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
			}

			res.status(200).json({
				accessToken: token,
				id: user._id,
				username: user.username,
				user: {
					email: user.email,
					roles: authorities,
				}
			});
		});
};