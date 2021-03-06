const mongoose         = require('mongoose');
      mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user    = require("./user.model");
db.role    = require("./role.model");
db.gallery = require("./gallery.model");
db.event   = require("./event.model");
db.profile = require("./profile.model");
db.booking = require("./booking.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;