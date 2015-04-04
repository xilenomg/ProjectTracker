projectTrackerApp.service('UserService', ['$http', function($http){
	var register = function(user){
		return $http.post('/api/user/register', user);
	};

	var authenticate = function(user){
		return $http.post('/api/user/authenticate', user);
	}

	return {
		register: register,
		authenticate: authenticate
	};
}]);