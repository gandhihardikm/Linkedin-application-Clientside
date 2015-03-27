var education;
var clientURL = 'http://10.0.0.152:6161';
var mysql = require("./mysql");

function educationDetails(req, res) {
	console.log("Headers: : " + JSON.stringify(req.headers));
	console.log("Session: : " + JSON.stringify(req.session));
	console.log("Token: : " + req.session.token);
	if (req.session.token === req.headers.authorization) {
		var educationDetail = "SELECT * FROM LinkedIn.Education_Details where User_ID='"+req.session.userID+"'";
		console.log("Query Log : " + educationDetail.toString());
		
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
			} else {
				if (!res.finished) {
					if (results.length > 0){
						console.log(results);
						education = JSON.stringify(results);
						
						//To Over Come CORS
						res.header('Access-Control-Allow-Origin', clientURL);
						res.header("Access-Control-Allow-Credentials", true);
						
						res.json({
						  "educationDetail": education,
						  "status":true,
						  "error" : "none"
						});
						console.log("User Found Succesfully");	
					} else {
						console.log("User Not Login");
						
						
						//To Over Come CORS
						res.header('Access-Control-Allow-Origin', clientURL);
						res.header("Access-Control-Allow-Credentials", true);
						
						res.json({
							"status":true,
							"error" : "User Not Valid"
						});
					}
				}
			}
		}, educationDetail);
	} else {
		console.log("Session Not Present");	
		//To Over Come CORS
		req.session.destroy();
		res.header('Access-Control-Allow-Origin', clientURL);
		res.header("Access-Control-Allow-Credentials", true);
		
		res.json({
		  "status":false,
		  "error" : "none"
		});
	}
}

exports.educationDetails = educationDetails;