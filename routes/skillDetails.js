var skillDetail;
var clientURL = 'http://10.0.0.152:6161';
var mysql = require("./mysql");

function getSkillDetails(req, res) {
	console.log("Headers: : " + JSON.stringify(req.headers));
	console.log("Session: : " + JSON.stringify(req.session));
	console.log("Token: : " + req.session.token);
	if (req.session.token === req.headers.authorization) {
		var skillDetail = "SELECT * FROM LinkedIn.Skill_Details where User_ID='"+req.session.userID+"'";
		console.log("Query Log : " + skillDetail.toString());
		
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
				if (results.length > 0){
					console.log(results);
					skillDetail = JSON.stringify(results);
					
					//To Over Come CORS
					res.header('Access-Control-Allow-Origin', clientURL);
					res.header("Access-Control-Allow-Credentials", true);
					
					res.json({
					  "skillDetail": skillDetail,
					  "status":true,
					  "error" : "none"
					});
					console.log("User Found Succesfully");	
				} else {
					console.log("Details Not Present");

					//To Over Come CORS
					res.header('Access-Control-Allow-Origin', clientURL);
					res.header("Access-Control-Allow-Credentials", true);
					
					res.json({
						"status":true,
						"error" : "Details Not Present"
					});
				}
			}
		}, skillDetail);
	} else {
		console.log("Session Not Present");	
		//To Over Come CORS
		res.header('Access-Control-Allow-Origin', clientURL);
		res.header("Access-Control-Allow-Credentials", true);
		
		res.json({
		  "status":false,
		  "error" : "none"
		});
	}
}

exports.skillDetails = getSkillDetails;