const {
	authJwt
} = require("../middlewares");
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/bookings", [authJwt.verifyToken], controller.index);

	app.get("/api/bookings/user", [authJwt.verifyToken], controller.user);

	app.get("/api/bookings/pending", controller.pending);

	app.get("/api/bookings/:slug", [authJwt.verifyToken], controller.show);

	app.post("/api/bookings", [authJwt.verifyToken], controller.store);

	app.patch("/api/bookings/status/:id", [authJwt.verifyToken], controller.status);

	app.delete("/api/bookings/:id", [authJwt.verifyToken], controller.delete);
	
};