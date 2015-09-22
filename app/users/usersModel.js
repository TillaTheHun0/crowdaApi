var Firebase = require('firebase');
var baseRef = require("../config").firebase;

var ref = baseRef.child("users");

function getUsers(callback){
	ref.on('value', function(snapshot){
		callback(snapshot.val());
	});
}

exports.getUsers = getUsers;