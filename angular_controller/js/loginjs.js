var email, paswd;
var serverBaseURL = 'http://10.0.0.152:7272/';
var linkedInApp = angular.module('linkedInApp', ['ngCookies']);

function LoginController($scope, $http, $location, $window, $cookies) {
	
	
	if ($window.localStorage.token) {
		$window.location = '/successLogin';
	} else {
		$scope.login = function() {
			if($scope.email == null || $scope.password == null){
				alert("Please enter Username and password.");
				return;
			}
			email = $scope.email;
			paswd = $scope.password;
			var req = {
				method : 'POST',
				url : serverBaseURL + 'login',
				data : {
					"email" : email,
					"password" : paswd
				},
				withCredentials: true
			};
			
			$http(req).success(function(response) {
				if (response.status === true) {
					$window.localStorage.token = response.token;
					$window.localStorage.lastLog = response.lastlog;
					$window.location = '/successLogin';
				} else {
					$scope.invalidUser = "Invalid Username or Password";
					
				}	
			}).error(function(error) {
				alert("Error");
			});
		};
	}
}

function signUpController($scope, $http, $location, $window, $cookies) {
	var firstName, lastName, emailID, password;
	if ($window.localStorage.token) {
		$window.location = '/successLogin';
	} else {
		$scope.signUpSubmit = function() {
			if($scope.firstName == null || $scope.newUserEmail == null || $scope.newUserPassword == null){
				alert("Please fill alteast First Name, Email Id and Password.");
				return;
			}
			
			firstName = $scope.firstName;
			lastName = $scope.lastName;
			emailID =  $scope.newUserEmail;
			password = $scope.newUserPassword;
			
			var req = {
					method : 'POST',
					url : serverBaseURL + 'signUp',
					data : {
						"name" : firstName + " " +lastName,
						"emailID": emailID,
						"password": password,
					},
					withCredentials: true
				};
			
			$http(req).success(function(response) {
				if (response.status === true) {
					$scope.accountCreated = "Account Created. Please signin.";
					
				} else {
					$scope.existingUser = "Account already exists.";
					
				} 
				//$window.location = '/login';	
			}).error(function(error) {
				alert("Error");
			});
		};
	}
}

linkedInApp.controller('signInController', LoginController);
linkedInApp.controller('signUpController', signUpController);