const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const Role = db.role;
const dbConfig = require('./app/config/db.config');
const app = express();


var whitelist = ['http://localhost:3000', 'http://localhost:9527']

var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = {
			origin: true
		} // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = {
			origin: false
		} // disable CORS for this request
	}
	callback(null, corsOptions) // callback expects two parameters: error and options
}


app.use(cors(corsOptionsDelegate));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/', express.static(__dirname + '/app/public'));

// simple route
app.get("/", (req, res) => {
	res.json({
		message: "Welcome to bezkoder application."
	});
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/profile.routes')(app);
require('./app/routes/gallery.routes')(app);
require('./app/routes/event.routes')(app);
require('./app/routes/booking.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

db.mongoose
	.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Successfully connect to MongoDB.");
		// initial();
	})
	.catch(err => {
		console.error("Connection error", err);
		process.exit();
	});

// function initial() {
//     Role.estimatedDocumentCount((err, count) => {
//         if (!err && count === 0) {
//             new Role({
//                 name: "user"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'user' to roles collection");
//             });

//             new Role({
//                 name: "moderator"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'moderator' to roles collection");
//             });

//             new Role({
//                 name: "admin"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'admin' to roles collection");
//             });
//         }
//     });
// }