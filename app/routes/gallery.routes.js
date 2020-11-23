const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './app/public/uploads/gallery')
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
const controller = require("../controllers/gallery.controller");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/gallery", controller.index);

	app.get("/api/gallery/featured", controller.featured);

	app.post("/api/gallery", upload.single('image'), [authJwt.verifyToken], controller.store);

	app.patch("/api/gallery/:id", [authJwt.verifyToken], controller.update);

	app.delete("/api/gallery/:id", [authJwt.verifyToken], controller.delete);
};