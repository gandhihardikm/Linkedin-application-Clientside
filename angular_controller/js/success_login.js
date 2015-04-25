var serverBaseURL = 'http://10.0.0.152:7272/';
var successLogin = angular.module('homePageApp', ['xeditable', 'ngCookies']);
successLogin.run(function(editableOptions) {
	  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
var userID;
function homePageController($scope, $http, $location, $window, $cookies) {
	if ($window.localStorage.token) { 
		$scope.last_Login = $window.localStorage.lastLog;
		
		var reqUserInfo = {
				method : 'GET',
				url : serverBaseURL + 'userInfo',
				headers: {
				    'Authorization': $window.localStorage.token
				},
				withCredentials: true
			};
			
			$http(reqUserInfo).success(function(response) {
				if (response.status === true) {					
					$scope.userV = {
						    name: response.user.User_Name,
						    professional_headline: response.user.Professional_Headline,
						    city: response.user.City,
						    state: response.user.State,
						    summary: response.user.Summary
					};
					userID = response.user.User_ID;
				} else {
					$window.localStorage.clear();
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
			
			var reqEducationDetails = {
					method : 'GET',
					url : serverBaseURL + 'educationdetails',
					headers: {
					    'Authorization': $window.localStorage.token
					},
					withCredentials: true
				};
			
			$http(reqEducationDetails).success(function(response) {
				if (response.status === true) {					
					//alert(JSON.stringify(response.educationDetail));
					$scope.eduationDetail = JSON.parse(response.educationDetail);
					$scope.eduationDetail.Year_of_Joining = Date.parse($scope.eduationDetail.Year_of_Joining);
				} else {
					$window.localStorage.clear();
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
			
			var reqExperienceDetails = {
					method : 'GET',
					url : serverBaseURL + 'experienceDetails',
					headers: {
					    'Authorization': $window.localStorage.token
					},
					withCredentials: true
				};
			
			$http(reqExperienceDetails).success(function(response) {
				if (response.status === true) {					
					//alert(JSON.stringify(response.educationDetail));
					$scope.experienceDetail = JSON.parse(response.experienceDetail);
				} else {
					$window.localStorage.clear();
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
			
			var reqSkillDetails = {
					method : 'GET',
					url : serverBaseURL + 'skillDetails',
					headers: {
					    'Authorization': $window.localStorage.token
					},
					withCredentials: true
				};
			
			$http(reqSkillDetails).success(function(response) {
				if (response.status === true) {					
					//alert(JSON.stringify(response.educationDetail));
					$scope.skillDetail = JSON.parse(response.skillDetail);
				} else {
					$window.localStorage.clear();
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
			
			$scope.updateUser = function(data, field) {
				var fieldName;
				if (field === "name") {
					fieldName = "User_Name";
				} else if (field === "prof_heading") {
					fieldName = "Professional_Headline";
				} else if (field === "state") {
					fieldName = "State";
				} else if (field === "city") {
					fieldName = "City";
				} else if (field === "summary") {
					fieldName = "Summary";
				}
				var req = {
						method : 'POST',
						url : serverBaseURL + 'updateUser',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {
							"id": userID, "name": data, "field": fieldName
						},
						withCredentials: true
					};
			    return $http(req);
			};
			
			$scope.addEducationToggle = function () {
				$scope.educationDiv = !$scope.educationDiv;
			};
			
			$scope.addEducationDetail = function () {
				var reqAddEduDetails = {
						method : 'POST',
						url : serverBaseURL + 'addEducationDetail',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {
							"User_ID": userID,
							"Degree": $scope.degree,
							"University_Name": $scope.school,
							"Courses": $scope.courses,
							"YOJ" : $scope.yoj,
							"YOE" : $scope.yoe
						},
						withCredentials: true
					};
				
				$http(reqAddEduDetails).success(function(response) {
					if (response.status === true) {					
						$window.location = '/successLogin';
					} else {
						$window.localStorage.clear();
						$window.location = '/login';
					}	
				}).error(function(error) {
					alert("Error");
				});
			};
			
			$scope.addExperienceToggle = function () {
				$scope.experienceDiv = !$scope.experienceDiv;
			};
			
			$scope.addExperienceDetail = function () {
				var reqAddEduDetails = {
						method : 'POST',
						url : serverBaseURL + 'addExperienceDetail',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {
							"User_ID": userID,
							"company": $scope.company,
							"jobTitle": $scope.jobTitle,
							"jobDesc": $scope.jobDesc,
							"startDate" : $scope.startDate,
							"endDate" : $scope.endDate
						},
						withCredentials: true
					};
				
				$http(reqAddEduDetails).success(function(response) {
					if (response.status === true) {					
						$window.location = '/successLogin';
					} else {
						$window.localStorage.clear();
						$window.location = '/login';
					}	
				}).error(function(error) {
					alert("Error");
				});
			};
			
			$scope.addSkillToggle = function () {
				$scope.skillDiv = !$scope.skillDiv;
			};
			
			$scope.addSkillDetail = function () {
				var reqAddSkillDetail = {
						method : 'POST',
						url : serverBaseURL + 'addSkillDetail',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {
							"User_ID": userID,
							"skill": $scope.skill
						},
						withCredentials: true
					};
				
				$http(reqAddSkillDetail).success(function(response) {
					if (response.status === true) {					
						$window.location = '/successLogin';
					} else {
						$window.localStorage.clear();
						$window.location = '/login';
					}	
				}).error(function(error) {
					alert("Error");
				});
			};
			
			$scope.search = function () {
				$window.localStorage.search = $scope.searchString;
				$window.location = '/connectionSearchResult';
			};
			
			$scope.signOut = function () {
				var req = {
						method : 'GET',
						url : serverBaseURL + 'signOut',
						headers: {
						    'Authorization': $window.localStorage.token 
						},
						withCredentials: true
					};
				
				$http(req).success(function(response) {
					//alert(JSON.stringify(response));
					if (response.status === true) {
						$window.localStorage.clear();
						$window.location = '/login';
					}
				}).error(function(error) {
					alert("Error Logging Out");
				});
			};
	} else {
		$window.location = '/login';
	}
	
}

successLogin.controller('homePageController', homePageController);