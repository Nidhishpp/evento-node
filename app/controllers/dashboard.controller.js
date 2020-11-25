const db = require("../models");
const Event = db.event;
const Profile = db.profile;
const Gallery = db.gallery;
const Booking = db.booking;

exports.index = (req, res) => {
	const event_query = new Promise((success, failure) => {
		Event.countDocuments()
			.exec((err, event) => {
				if (err) {
					res.status(500).json({
						message: err
					});
					return;
				}

				success(event);
			});
	});
	const profile_query = new Promise((success, failure) => {
		Profile.countDocuments()
			.exec((err, profile) => {
				if (err) {
					res.status(500).json({
						message: err
					});
					return;
				}

				success(profile);
			});
	});
	const gallery_query = new Promise((success, failure) => {
		Gallery.countDocuments()
			.exec((err, gallery) => {
				if (err) {
					res.status(500).json({
						message: err
					});
					return;
				}

				success(gallery);
			});
	});
	const booking_query = new Promise((success, failure) => {
		Booking.countDocuments()
			.exec((err, booking) => {
				if (err) {
					res.status(500).json({
						message: err
					});
					return;
				}

				success(booking);
			});
	});
	Promise.all([event_query, profile_query, gallery_query, booking_query]).then(([event_count, profile_count, gallery_count, booking_count]) => {
		var data = {
			event_count,
			profile_count,
			gallery_count,
			booking_count
		}

		res.status(200).json(data);
	})
};