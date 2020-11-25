const db = require("../models");
const Gallery = db.gallery;

exports.index = (req, res) => {
	Gallery.find()
		.exec((err, galleries) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			res.status(200).json(galleries);
		});
};

exports.featured = (req, res) => {
	Gallery.find({
			featured: true
		})
		.exec((err, galleries) => {
			if (err) {
				res.status(500).json({
					message: err
				});
				return;
			}

			res.status(200).json(galleries);
		});
};

exports.store = (req, res) => {
	try {
		console.log(req.body)
		var filename = req.file.filename;
	} catch (error) {
		res.status(500).json({
			message: "File Not Found"
		});
		return;
	}
	const gallery = new Gallery({
		title: req.body.title,
		image: 'http://localhost:8080/uploads/gallery/' + filename,
		featured: req.body.featured
	});

	gallery.save((err, gallery) => {
		if (err) {
			res.status(500).json({
				message: err.message
			});
			return;
		} else {
			res.status(200).json(gallery)
		}

	});

};

exports.update = (req, res) => {

	const id = {
		_id: req.params.id
	}
	var newvalues = {
		$set: {
			featured: req.body.featured
		}
	};

	Gallery.updateOne(id, newvalues, (err, gallery) => {
		if (err) {
			res.status(500).json({
				message: err
			});
			return;
		} else {
			res.status(200).json(gallery)
		}

	});

};

exports.delete = (req, res) => {

	const id = {
		_id: req.params.id
	}

	Gallery.deleteOne(id, (err, gallery) => {
		if (err) {
			res.status(500).json({
				message: err
			});
			return;
		} else {
			res.status(200).json(gallery)
		}

	});

};