var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";
var Firebase = require('firebase');
var baseRef = new Firebase("https://crowda.firebaseio.com/");

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: "127.0.0.1"
};

/*
config.mongodb = {
  port: process.env.MONGODB_PORT || 27017,
  host: process.env.MONGODB_HOST || "localhost"
};
*/

//firebase base URL
config.firebase = baseRef;

if (PRODUCTION) {
  //for example
  config.express.ip = "0.0.0.0";
}
//config.db same deal
//config.email etc
//config.log
