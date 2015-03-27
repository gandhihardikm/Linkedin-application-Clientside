var clientURL = 'http://10.0.0.152:6161';
var mysql = require("./mysql");
var searchPeopleList;

function searchResult(req, res) {
	console.log(req.body);
	var searchQuery = "SELECT User_Details.User_Name,Invitation_Table.Status from User_Details LEFT JOIN Invitation_Table On User_Details.User_ID=Invitation_Table.Invited_To_User_ID where User_Details.User_Name like '%"+ req.param("searchString")+"%';";
	
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
				searchPeopleList = JSON.stringify(results);
				
				//To Over Come CORS
				res.header('Access-Control-Allow-Origin', clientURL);
				res.header("Access-Control-Allow-Credentials", true);
				
				res.json({
				  "search": searchPeopleList,
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
	}, searchQuery);
}

exports.searchResult = searchResult;
