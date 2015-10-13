var baseRef = require("../config").admin;

var ref = baseRef.child("users");

function getUsers(callback){
	ref.on('value', function(snapshot){
		callback(snapshot.val());
	});
}

exports.getUsers = getUsers;