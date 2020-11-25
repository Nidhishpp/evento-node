const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './app/public/uploads/events')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})

const upload = multer({
	storage: storage
})

const {
	authJwt
} = require("../middlewares");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/events", controller.index);

	app.get("/api/events/featured", controller.featured);

	app.get("/api/events/:slug", controller.show);

	app.post("/api/events", upload.fields([{
		name: 'image',
		maxCount: 1
	}, {
		name: 'gallery',
		maxCount: 8
	}]), [authJwt.verifyToken], controller.store);
	
	app.patch("/api/events/featured/:id", [authJwt.verifyToken], controller.featureUpdate);

	app.delete("/api/events/:id", [authJwt.verifyToken], controller.delete);
	
};