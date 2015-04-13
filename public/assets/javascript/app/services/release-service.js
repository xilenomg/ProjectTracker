projectTrackerApp.service('ReleaseService', ['$http', function($http){
	var listReleasesFromProject = function(id_project){
		return $http.get('/api/projects/' + id_project + '/releases/listAll');
	};

	var listOne = function(id_project, id_release){
		return $http.get('/api/projects/' + id_project + '/releases/' + id_release);
	}

	var register = function(release){
		return  $http.post('/api/projects/' + release.id_project + '/releases/register', release);
	};

	return {
		listReleasesFromProject: listReleasesFromProject,
		register: register,
		listOne: listOne
	};
}]);