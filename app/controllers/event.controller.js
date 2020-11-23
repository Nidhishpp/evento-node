
var slugify = require('slugify')
const db = require("../models");
const Event = db.event;

exports.index = (req, res) => {
	Event.find()
		.exec((err, events) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			res.status(200).json(events);
		});
};

exports.featured = (req, res) => {
	Event.find({
			featured: true
		})
		.exec((err, events) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			res.status(200).json(events);
		});
};

exports.show = (req, res) => {
	Event.findOne({
			slug: req.params.slug
		})
		.exec((err, event) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			res.status(200).json(event);
		});
};

exports.store = (req, res) => {

	var gallery = [];
	req.files.gallery.forEach(function fn(item, index) {
		gallery.push('http://localhost:8080/uploads/events/' + item.filename);
	})

	var packages = JSON.parse(req.body.packages)
	// res.status(200).json(req.files.image[0].filename)
	const events = new Event({
		title: req.body.title,
		slug: slugify(req.body.title),
		image: 'http://localhost:8080/uploads/events/' + req.files.image[0].filename,
		description: req.body.description,
		featured: req.body.featured,
		gallery: gallery,
		packages: packages
	});

	events.save((err, event) => {
		if (err) {
			res.status(500).json({
				message: err
			});
			return;
		} else {
			res.status(200).json(event)
		}

	});

};

exports.delete = (req, res) => {

	const id = {
		_id: req.params.id
	}

	Event.deleteOne(id, (err, event) => {
		if (err) {
			res.status(500).json({
				message: err
			});
			return;
		} else {
			res.status(200).json(event)
		}

	});

};