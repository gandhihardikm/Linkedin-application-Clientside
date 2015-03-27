var clientURL = 'http://10.0.0.152:6161';
var mysql = require("./mysql");

function update (req, res) {
	console.log("Headers: : " + JSON.stringify(req.headers));
	console.log("Session: : " + JSON.stringify(req.session));
	console.log("Token: : " + req.session.token);
	
		var updateUser = "UPDATE LinkedIn.User_Details SET "+ req.param("field") +"='"+ req.param("name") +"' where User_ID='"+req.param("id")+"'";
		console.log("Query Log : " + updateUser.toString());
		
		mysql.fetchData(function(err,results){
			if(err) {
				// To over come CORS Error
				res.header('Access-Control-Allow-Origin', clientURL);
				res.header("Access-Control-Allow-Credentials", true);
							
				res.send({
					"status": true,
					"error" : "503 - Service unavailable"
				});
				console.log("503");
			} else {
					//To Over Come CORS
					res.header('Access-Control-Allow-Origin', clientURL);
					res.header("Access-Control-Allow-Credentials", true);
					
					res.json({
					  "status":true,
					  "error" : "none"
					});
					console.log("User Found Succesfully");	
			}
		}, updateUser);
}

exports.update = update;