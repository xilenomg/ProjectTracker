projectTrackerApp
.controller('ProjectReleasesController',['$route', '$scope', '$rootScope','ReleaseService', 'ProjectService', function($route, $scope, $rootScope, ReleaseService, ProjectsService){
	var id_project = $route.current.params.id_project;
	
	var showReleases = function(){
		ProjectsService.listOne(id_project).success(function(data){
			$scope.project = data;
			ReleaseService.listReleasesFromProject(id_project).success(function(data){
				$scope.releases = data;
			});
		});
	};

	//show or hide add release overlay
	$scope.toggleAddRelease = function(){
		console.log("toggle");
		$scope.showAddRelease = $scope.showAddRelease ? false : true;
	};

	//Listener to relist all releases
	$rootScope.$on('list-all-releases', function(event, args){
		showReleases();
	});

	$rootScope.$on('add-release-close', function(event, args){
		$scope.showAddRelease = false;
	});

	//hide add project overlay
	$scope.showAddRelease = false;

	//show projects
	showReleases();
}])
.directive('addRelease', ['$rootScope', 'ReleaseService', function($rootScope, ReleaseService){
	
	var linker = function(scope, element, attrs){
		scope.release = {name: null, start_date: null, end_date: null, id_project: null};

		attrs.$observe('idProject',function(){
			scope.release.id_project = attrs.idProject
		});

		scope.register = function(){
			ReleaseService.register(scope.release).success(function(data){
				$rootScope.$emit('add-release-message', {type: 'success', message: 'Release was added successfully'});
				$rootScope.$emit('list-all-releases');
				$rootScope.$emit('add-release-close');
			}).error(function(data){
				$rootScope.$emit('add-release-message', {type: 'error', message: data.message});
			});
		};
	};

	return {
		restrict: 'C',
		link: linker,
		templateUrl: '/views/pages/add-release.html'
	}
}])
.directive('addReleaseMessage', ['$rootScope', function($rootScope){
	var linker = function(scope, element, attrs){
		var setContent = function(type, message){
			// remove css classes
			element.removeClass('bg-success').removeClass('bg-danger');

			//add proper css class
			if ( type === 'success' ){
				element.addClass('bg-success');
			}
			else if( type === 'error' ) {
				element.addClass('bg-danger');
			}

			//change element message
			element.html(message);
		};

		//Listen to event signup-message
		$rootScope.$on('add-release-message', function (event, args){
			setContent(args.type, args.message);
		});
	};

	return {
		restrict: 'C',
		link: linker
	}
}]);;