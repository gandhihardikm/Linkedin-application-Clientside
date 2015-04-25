var serverBaseURL = 'http://10.0.0.152:7272/';
var searchPageApp = angular.module('searchPageApp', ['xeditable', 'ngCookies']);
searchPageApp.run(function(editableOptions) {
	  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
var userID;
function searchPageController($scope, $http, $location, $window, $cookies) {
	$scope.last_Login = $window.localStorage.lastLog;
		var req = {
				method : 'POST',
				url : serverBaseURL + 'userList',
				headers: {
				    'Authorization': $window.localStorage.token 
				},
				data: {
					'searchString': $window.localStorage.search
				},
				withCredentials: true
			};
		
		$http(req).success(function(response) {
			//alert(JSON.stringify(response));
			if (response.status === true) {
				$scope.peoples = JSON.parse(response.search);
				//$window.location = '/connectionSearchResult';
			}
		}).error(function(error) {
			alert("Error Searching For Result");
		});
		
		$scope.search = function () {
			$window.localStorage.search = $scope.searchString;
			$window.location = '/connectionSearchResult';
		};
		
		$scope.connect = function () {
			alert("Request Sent Successfully");
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
}

searchPageApp.controller('searchPageController', searchPageController);