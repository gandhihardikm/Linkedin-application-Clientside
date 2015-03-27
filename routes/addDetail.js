var clientURL = 'http://10.0.0.152:6161';
var mysql = require("./mysql");

function addEducation (req, res) {
	
	var addEduQuery="INSERT INTO LinkedIn.Education_Details(User_ID, Degree, University_Name, Courses, Year_of_Joining, Year_of_Ending) VALUES ("+req.session.userID+", '"+req.param("Degree")+"', '"+req.param("University_Name")+"', '"+req.param("Courses")+"', '"+req.param("YOJ")+"', '"+req.param("YOE")+"');";
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
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
	}, addEduQuery);
}

function addExperience (req, res) {
	
	var addExpQuery="Insert into LinkedIn.Experience_Details (User_ID,Company_Name,Start_Date,End_Date,Job_Title,Job_Profile) " +
	"values ('"+req.session.userID+"',"+req.param("company")+","+req.param("startDate")+",'"+req.param("endDate")+"','"+req.param("jobTitle")+"',"+req.param("jobDesc")+"); " ;
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
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
	}, addExpQuery);
}

function addSkill (req, res) {
	
	var addSkillQuery="INSERT INTO LinkedIn.Skill_Details(User_ID, Skill_Name) VALUES ("+req.session.userID+", '"+req.param("skill")+"');";
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
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
	}, addSkillQuery);
}

exports.addEducation = addEducation;
exports.addExperience = addExperience;
exports.addSkill = addSkill;
