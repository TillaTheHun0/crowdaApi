var router = require('express').Router(),
	auth = require('./authModel'),
	passport = require("passport"),
	FirebaseTokenGenerator = require('firebase-token-generator'),
	admin = require("../config").firebase;

var ref = admin.child("users");
var tokenGenerator = new FirebaseTokenGenerator("IcLVcWUkQJqrmhr28FdoiBsjCew23LQ6Dn4WsSfQ");

//called if successful
function login(req, res){
	console.log(req.body.username);
	var token = tokenGenerator.createToken({uid: req.body.username});
	ref.child(req.body.username).child("token").set(token, function(){
		res.json(token);
	});
}

function signup(req, res){
	auth.createUser(req.body.username, req.body.email, req.body.password, req.body.provider, 
		function(error){
			if(error){
				//error
				res.send('Error!');
			}
			else{
				res.send('200');
			}
		}
	);
}

router.post('/login', passport.authenticate('local', {session: false}), login);
router.post('/signup', signup);

module.exports = router;