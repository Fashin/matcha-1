var loginModule = angular.module('login', ['matcha']);

loginModule.controller('LoginController', ['$http', '$scope', function ($http, $scope) {
	$scope.username = "";
	$scope.password = "";

	$scope.login = function() {
		$http.post('/api/login', {'username':$scope.username, 'password': $scope.password}).then(
			function(response) {
				console.log(response);
			}
		);
	}
}]);
