var clientURL = 'http://10.0.0.152:6161';
var passwordHash = require("password-hash");
var ejs = require("ejs");
var mysql = require("./mysql");
var jwt = require('jwt-simple');

function signUpUser(req, res) {
	checkForExistingUser(req.param("emailID"),function(err,results){
		if(results){
			console.log("User already Exist.");
			res.header("Access-Control-Allow-Origin", clientURL);
			res.header("Access-Control-Allow-Credentials","true");
			res.send({
				  "status":true,
				  "error" : "none"
				});
			} else {
				
				var hashedpassword = passwordHash.generate(req.param("password"));
				console.log(hashedpassword);
				var insertUserQuery="INSERT into LinkedIn.User_Details(User_Name,Email_ID,Password) VALUES('"+req.param("name")+"','"+ 
				req.param("emailID")+"','"+hashedpassword+"');";
	
				mysql.fetchData(function(err,results){
					if(err) {
						throw err;
					} else {
			
				console.log(results);
				var expires = 700000;
				var token = jwt.encode({
				  iss: req.param("emailID"),
				  exp: expires
				}, "anystringshouldwork");
				
				req.session.email = req.param("emailID");
				req.session.token = token;

				// To over come CORS Error
				res.header('Access-Control-Allow-Origin', clientURL);
				res.header("Access-Control-Allow-Credentials", true);
				
				res.send({
				  token : token,
				  "status":true,
				  "error" : "none"
				});
				console.log("valid login");	
			
		}
	}, insertUserQuery);
	}
	});
}

function checkForExistingUser(newUserEmail, callback) {
	var getUser = "select * from User_Details where Email_ID='" + newUserEmail
			+ "'";
	console.log("Query is:" + getUser);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			callback(err, results.length > 0);
		}
	}, getUser);
}

exports.signUpUser = signUpUser;