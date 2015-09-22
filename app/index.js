var express = require("express");

var app = express();
app.set("views", __dirname);
//use whatever templating system(s) you like
app.set("view engine", "jade");

//Load the routes of API
app.use(require("app/site/router"));
app.use("/api", require("app/users/router"));
// Repeat the above line for additional model areas ("deals", "vehicles", etc)

//Error Handler must be last
app.use(require("app/errors/notFound"));

// Export the app instance for unit testing via supertest
module.exports = app;
