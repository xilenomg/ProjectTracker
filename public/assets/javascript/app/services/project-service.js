projectTrackerApp.service('ProjectService', ['$http', function($http){
	var listAll = function(){
		return $http.get('/api/projects/listAll');
	};

	var register = function(project){
		return $http.post('/api/projects/register', project);
	}

	return {
		listAll: listAll,
		register: register
	}
}]);