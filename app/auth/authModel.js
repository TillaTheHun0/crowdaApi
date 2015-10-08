var admin = require("../config").firebase,
    passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy,
	bcrypt = require("bcrypt");
	
var ref = admin.child("users");
	
passport.use(new LocalStrategy(
	function(username, password, callback) {
		//get user node from firebase based on username
		ref.child(username).once('value', function(snapshot){
			if(!snapshot.val()){
				return callback(null, false, {message: 'User does not exist'});
			}
			validPassword(password, snapshot.val().hash, function(err, valid){
				if(err){
					return callback(null, false, {message: 'Failure authenticating password'});
				}
				if(!valid){
					return callback(null, false, {message: 'Incorrect Password'});
				}
				console.log("yay");
				return callback(null, snapshot.val());
			})
		})
	}
));

function createUser(first, last, username, email, password, provider, next){
	ref.child(username).once('value', function(snapshot){
		if(snapshot.val()){//username taken
			next({error: "Username already taken"});
		}
		else {
			admin.child('email_lookup').child(escapeEmail(email)).once('value', function(snapshot){
				if(snapshot.val()){//email taken
					next({error: "Email is taken"});
				}
				else{
					generateHash(password, function(hash){
						ref.child(username).set(
							{first: first, last: last, hash: hash, provider: provider, email: email},
							function(){//update email lookup
								admin.child('email_lookup').child(escapeEmail(email)).set(username, next(null));	
							}
						);
					});
				}
			})
		}
	});
};

/**
 * Utility Methods
 */
function validPassword(password, hash, done){
	bcrypt.compare(password, hash, function(err, res){
		if(err){
			done(err, null);
		}
		else{
			(res == true) ? done(null, true) : done(null, false);
		}
	})
};

function generateHash(password, done){
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(password, salt, function(err, hash){
			done(hash);
		})
	});
};

function escapeEmail(email){
	return email.replace('.', ',');
}

exports.createUser = createUser;
	



