var express = require("express");
var bodyParser   = require('body-parser');
var passport = require('passport');

var app = express();
// set up our express application
app.use(bodyParser()); // get information from html forms
app.use(passport.initialize());
app.use(passport.session());
app.set("views", __dirname);
//use whatever templating system(s) you like
app.set("view engine", "jade");

//Load the routes of API
app.use(require("app/site/router"));
app.use("/api", require("app/users/router"));
app.use("/api", require("app/auth/router"));
// Repeat the above line for additional model areas ("deals", "vehicles", etc)

//Error Handler must be last
app.use(require("app/errors/notFound"));

// Export the app instance for unit testing via supertest
module.exports = app;
