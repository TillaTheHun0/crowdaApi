var router = require('express').Router(),
	model = require('./paymentModel');	
	
function getToken(req, res){
	console.log("retrieving token for braintree for user: " + req.body.username);
	model.generateToken(function(token){
		res.send({token:token});
	});
}

router.get('/payment', getToken);

module.exports = router;