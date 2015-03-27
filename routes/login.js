
var usrname, paswd;
var clientURL = 'http://10.0.0.152:6161';
var ejs = require("ejs");
var mysql = require("./mysql");
var passwordHash = require("password-hash");
var jwt = require('jwt-simple');


function afterLogin (req, res) {
	if (req.session.email === req.param("email")) {
		//console.log("Already login");
		// To over come CORS Error
		res.header('Access-Control-Allow-Origin', clientURL);
		res.header("Access-Control-Allow-Credentials", true);
		
		res.send({
		  "status":true,
		  "error" : "none"
		});
	} else {
		var getUser = "SELECT Password, User_ID, Last_Login FROM LinkedIn.User_Details where Email_ID='"+req.param("email")+"'";
		console.log("Query Log : " + getUser.toString());
		
		mysql.fetchData(function(err,results){
			if(err) {
				console.log(err);
				console.log(results);
				console.log(err.code);
				
				if (results === "503") {
					// To over come CORS Error
					res.header('Access-Control-Allow-Origin', clientURL);
					res.header("Access-Control-Allow-Credentials", true);
								
					res.send({
						"status": true,
						"error" : "503 - Service unavailable"
					});
					console.log("503");
				} 
				//throw err;
			} else {
				if((results.length > 0) && (passwordHash.verify(req.param("password"),results[0].Password))){
					if (!res.finished) {
						//console.log(results);
						var expires = 700000;
						var token = jwt.encode({
						  iss: req.param("username"),
						  exp: expires
						}, "anystringshouldwork");
						var user = results[0];
						var updateQuery="UPDATE LinkedIn.User_Details SET Last_Login='"+getdatetime()+"' WHERE User_ID='"+results[0].User_ID+"'";
						
						mysql.fetchData(function(err,results){
							if(err) {
								console.log(err);
								console.log(results);
								console.log(err.code);
								
								if (results === '503') {
									// To over come CORS Error
									res.header('Access-Control-Allow-Origin', clientURL);
									res.header("Access-Control-Allow-Credentials", true);
												
									res.send({
										"status": true,
										"error" : "503 - Service unavailable"
									});
									console.log("503 Sent");
								} 
							} else {
									if (!res.finished) {
										// set session parameters
										req.session.email = req.param("email");
										req.session.userID = user.User_ID;
										req.session.token = token;
										//console.log("After Login Session: : " + JSON.stringify(req.session));
		
										// To over come CORS Error
										res.header('Access-Control-Allow-Origin', clientURL);
										res.header("Access-Control-Allow-Credentials", true);
													
										res.send({
											"lastlog" : user.Last_Login,
											token : token,
											"status":true,
											"error" : "none"
										});
										console.log("valid login");	
									}
							}	
						}, updateQuery);
					}
				} else {
					console.log("Invalid Login");
					// To over come CORS Error
					res.header('Access-Control-Allow-Origin', clientURL);
					res.header("Access-Control-Allow-Credentials", true);
					
					res.send({
						"status":false,
						"error" : "User Not Valid"
					});
				}
			}
		}, getUser);
	}
}

function getdatetime(){
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-"
	                + (currentdate.getMonth()+1)  + "-" 
	                + currentdate.getDate() + " "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() + ":" 
	                + currentdate.getSeconds();
	return datetime;
}

exports.afterLogin = afterLogin;