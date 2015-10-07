var express = require("express");
var bodyParser   = require('body-parser');
var passport = require('passport');

var app = express();
// set up our express application
app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.set("views", __dirname);
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "http://localhost:8100");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	next();
})
//use whatever templating system(s) you like
app.set("view engine", "jade");

//Load the routes of API
app.use(require("app/site/router"));
app.use("/api", require("app/users/router"));
app.use("/api", require("app/auth/router"));
app.use("/api", require("app/eventApi/router"));
// Repeat the above line for additional model areas ("deals", "vehicles", etc)

//Error Handler must be last
app.use(require("app/errors/notFound"));

// Export the app instance for unit testing via supertest
module.exports = app;
