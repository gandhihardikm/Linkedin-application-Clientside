var serverBaseURL = 'http://10.0.0.152:7272/';
var userID;
var connectionPageApp = angular.module('connectionPageApp', ['xeditable', 'ngCookies']);
connectionPageApp.run(function(editableOptions) {
	  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

function connectionPageController($scope, $http, $location, $window, $cookies) {
	$scope.last_Login = $window.localStorage.lastLog;
	
	$scope.search = function () {
		$window.localStorage.search = $scope.searchString;
		$window.location = '/connectionSearchResult';
	};
	
	if ($window.localStorage.token) {  
			var req = {
					method : 'GET',
					url : serverBaseURL + 'connections',
					headers: {
					    'Authorization': $window.localStorage.token 
					},
					withCredentials: true
				};
			
			$http(req).success(function(response) {
				//alert(JSON.stringify(response));
				if (response.status === true) {
					$scope.connections = JSON.parse(response.connectedPeopleList);
					//alert($scope.connections);
				}
			}).error(function(error) {
				alert("Error Logging Out");
			});
			
			var req = {
					method : 'GET',
					url : serverBaseURL + 'pendingConnections',
					headers: {
					    'Authorization': $window.localStorage.token 
					},
					withCredentials: true
				};
			
			$http(req).success(function(response) {
				//alert(JSON.stringify(response));
				if (response.status === true) {
					$scope.pendingConnectionList = JSON.parse(response.pendingConnectionList);
					//alert($scope.connections);
				}
			}).error(function(error) {
				alert("Error Logging Out");
			});
	} else {
		$window.location = '/login';
	}
	
	$scope.connect = function () {
		alert("Invitation Accepted");
		/*var req = {
				method : 'POST',
				url : serverBaseURL + 'acceptInvitation',
				headers: {
				    'Authorization': $window.localStorage.token 
				},
				data: {
					
				},
				withCredentials: true
			};
		
		$http(req).success(function(response) {
			//alert(JSON.stringify(response));
			if (response.status === true) {
				$scope.pendingConnectionList = JSON.parse(response.pendingConnectionList);
				//alert($scope.connections);
			}
		}).error(function(error) {
			alert("Error Logging Out");
		});*/
	}
	
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
};

connectionPageApp.controller('connectionPageController', connectionPageController);