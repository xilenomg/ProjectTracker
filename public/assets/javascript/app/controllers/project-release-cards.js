projectTrackerApp.
controller('ProjectReleaseCardsController', ['$scope', '$route','ProjectService', 'ReleaseService', function($scope, $route, ProjectService, ReleaseService){
	var params = $route.current.params;
	var id_project = params.id_project;
	var id_release = params.id_release;

	ProjectService.listOne(id_project).success(function(project){
		console.log(project);
		if ( project ){
			$scope.project = project
			ReleaseService.listOne(id_project, id_release).success(function(release){
				console.log(release);
				$scope.release = release;
			});
		}
	});

}]);