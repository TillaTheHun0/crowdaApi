var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";
var Firebase = require('firebase');
var admin = new Firebase("https://crowda.firebaseio.com/");
var eventAdmin = new Firebase("https://crowda.firebaseio.com/Events");

config.express = {
  port: process.env.PORT || 3000,
  ip: "127.0.0.1"
};

/*
config.mongodb = {
  port: process.env.MONGODB_PORT || 27017,
  host: process.env.MONGODB_HOST || "localhost"
};
*/

//authenticate firebase admin
admin.authWithCustomToken("IcLVcWUkQJqrmhr28FdoiBsjCew23LQ6Dn4WsSfQ", function(error, authData){
  if(error){
    console.log("authentication failed");
  }
})

//authenticate firebase eventAdmin

function authHandler(error, authData) { 
  if(error) {
    console.log("authentification failed", error);
  }  
}

eventAdmin.authWithPassword({
  email : 'crowdaapp@gmail.com',
  password: 'crowda'
}, authHandler)

//firebase base URL
config.admin = admin;
config.eventAdmin = eventAdmin; 

if (PRODUCTION) {
  //for example
  config.express.ip = "0.0.0.0";
}
//config.db same deal
//config.email etc
//config.log
