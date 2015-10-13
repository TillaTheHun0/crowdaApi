var admin = require('../config').firebase;
var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "zyg3qnj8fw6sybq9",
  publicKey: "zx2m35c4n5x8hkdh",
  privateKey: "2b20549d578cd864854903ea2335dfba"
});

function generateToken(next){
	gateway.clientToken.generate({}, function (err, res) {
    if(err){
      console.log(err);
      next(null);
    }
    else{
      console.log(typeof res.clientToken);
      next(res.clientToken);
    }
  });
};

exports.generateToken = generateToken;
