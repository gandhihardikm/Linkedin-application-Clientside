var clientURL = 'http://10.0.0.152:6161';
var mysql = require("./mysql");
var connectedPeopleList;

function connections(req, res) {
	var connectedPeople = "select * from User_Details where User_ID in(select Invited_To_User_ID from Invitation_Table where Invited_By_User_ID="+ req.session.userID +" and Status="+1+");";
	
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
				connectedPeopleList = JSON.stringify(results);
				
				//To Over Come CORS
				res.header('Access-Control-Allow-Origin', clientURL);
				res.header("Access-Control-Allow-Credentials", true);
				
				res.json({
				  "connectedPeopleList": connectedPeopleList,
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
	}, connectedPeople);
}

function pendingConnections(req, res) {
var pendingConnection = "select * from User_Details where User_ID in(select Invited_By_User_ID from Invitation_Table where Invited_To_User_ID="+ req.session.userID +" and Status="+0+");";
	
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
				pendingConnectionList = JSON.stringify(results);
				
				//To Over Come CORS
				res.header('Access-Control-Allow-Origin', clientURL);
				res.header("Access-Control-Allow-Credentials", true);
				
				res.json({
				  "pendingConnectionList": pendingConnectionList,
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
	}, pendingConnection);
}

exports.connections = connections;
exports.pendingConnections = pendingConnections;
