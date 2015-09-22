var users = require('./usersModel');
var router = require('express').Router();

function getUsers(req,res){
	users.getUsers(function(snapshot){
		res.json(snapshot);
	})
}

router.get("/users", getUsers);

module.exports = router;