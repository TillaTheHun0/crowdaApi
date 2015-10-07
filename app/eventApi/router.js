var router = require('express').Router();
var https = require('https');

var OATH = "KM4H6BDYC52STCUYTWTZ"; 

function getEvents(req, res){
	https.get("https://www.eventbriteapi.com/v3/users/me/owned_events/?token=" + OATH, function(snapshot) {
		snapshot.on('data', function(chunk){
			//console.log(chunk.toString());
			var data = JSON.parse(chunk);		
			res.json(data); 
			console.log(data);
		});
		snapshot.on('error', function(e) {
			res.html("404 ERROR: Page Not Found");
			console.log(e); 
		});
	});
}

router.get("/events", getEvents);

module.exports = router;




