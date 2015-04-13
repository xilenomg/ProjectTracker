projectTrackerApp.service('ProjectService', ['$http', function($http){
	var listAll = function(){
		return $http.get('/api/projects/listAll');
	};

	var listOne = function(id_project){
		return $http.get('/api/projects/' + id_project);
	}

	var register = function(project){
		return $http.post('/api/projects/register', project);
	}

	return {
		listAll: listAll,
		register: register,
		listOne: listOne
	}
}]);