var router = require('express').Router(),
	braintree = require('braintree');
	//auth = require('./authModel');

var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: "jdsgwtx5kcxc675z",
	publicKey: "3xyp6fh46yvzfwjg",
	privateKey: "901c4eb0bd8c6447b6f4a75f8e458ff9"
});

function getClientToken(req, res) {
	gateway.clientToken.generate({}, function(err, response) {
		res.json({Response : response.clientToken,}); 
	});
}

router.get("/client_token", getClientToken); 

module.exports = router; 