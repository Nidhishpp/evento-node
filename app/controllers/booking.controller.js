const db = require("../models");
const Booking = db.booking;
const Profile = db.profile;

exports.index = (req, res) => {
	Booking.aggregate([{
				$lookup: {
					from: 'profiles',
					localField: 'user',
					foreignField: 'user',
					as: 'profile'
				}
			}, {
				$lookup: {
					from: 'events',
					localField: 'event',
					foreignField: '_id',
					as: 'event'
				}
			},
			{
				"$addFields": {
					"profile": {
						"$arrayElemAt": ["$profile", 0]
					},
					"event": {
						"$arrayElemAt": ["$event", 0]
					},
				}
			}
		])
		.exec((err, bookings) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}


			res.status(200).json(bookings);
		});
};

exports.user = (req, res) => {
	Booking.find({
			user: req.userId
		})
		.exec((err, bookings) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			res.status(200).json(bookings);
		});
};

exports.pending = (req, res) => {
	Booking.find({
			status: "pending"
		})
		.exec((err, bookings) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			res.status(200).json(bookings);
		});
};

exports.show = (req, res) => {
	Booking.findOne({
			slug: req.params.slug
		})
		.exec((err, booking) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			res.status(200).json(booking);
		});
};

exports.store = (req, res) => {


	const booking = new Booking({
		address_line_1: req.body.address_line_1,
		address_line_2: req.body.address_line_2,
		city: req.body.city,
		state: req.body.state,
		pincode: req.body.pincode,
		event: req.body.event,
		event_name: req.body.event_name,
		package: req.body.package,
		package_name: req.body.package_name,
		start_date: req.body.date[0],
		end_date: req.body.date[1],
		approx_count: req.body.approx_count,
		hall: req.body.hall,
		message: req.body.message,
		user: req.userId
	});

	booking.save((err, booking) => {
		if (err) {
			res.status(500).json({
				message: err
			});
			return;
		} else {
			res.status(200).json(booking)
		}

	});

};

exports.status = (req, res) => {


	const id = {
		_id: req.params.id
	}
	var newvalues = {
		$set: {
			status: req.body.status
		}
	};

	Booking.updateOne(id, newvalues, (err, booking) => {
		if (err) {
			res.status(500).json({
				message: err
			});
			return;
		} else {
			res.status(200).json(booking)
		}

	});

};

exports.delete = (req, res) => {

	const id = {
		_id: req.params.id
	}

	Bookings.deleteOne(id, (err, bookings) => {
		if (err) {
			res.status(500).json({
				message: err
			});
			return;
		} else {
			res.status(200).json(bookings)
		}

	});

};