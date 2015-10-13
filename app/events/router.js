var router = require('express').Router();
var eventAdmin = require("../config").eventAdmin;

function getEvents(req, res) {
	eventAdmin.once('value', function(snapshot){
		if(!snapshot.val()){
			console.log("Fail");
		}
		else {
			res.json(snapshot.val()); 
		}
	})
} 

router.get("/events", getEvents);

module.exports = router;




