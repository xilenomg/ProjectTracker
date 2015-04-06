projectTrackerApp
.controller('ProjectsController', ['$scope', '$rootScope', '$cookies', 'ProjectService', 'AuthenticationService', function($scope, $rootScope, $cookies, ProjectService, AuthenticationService){
	AuthenticationService.requireLogin();

	//show projects function
	var showProjects = function(){
		ProjectService.listAll()
		.success(function(data, status, headers, config){
			$scope.projects = data;
		})
		.error(function(data, status, headers, config){
			$scope.projects = null;
		});
	};

	//show or hide add project overlay
	$scope.toggleAddProject = function(){
		$scope.showAddProject = $scope.showAddProject ? false : true;
	};

	//Listener to relist all projects
	$rootScope.$on('list-all-projects', function(event, args){
		showProjects();
	});

	$rootScope.$on('add-projects-close', function(event, args){
		$scope.showAddProject = false;
	});

	//hide add project overlay
	$scope.showAddProject = false;

	//show projects
	showProjects();

}])
.directive('addProject', ['$rootScope', 'ProjectService', function($rootScope, ProjectService){
	
	var linker = function(scope, element, attrs){
		scope.project = {title: null, description: null};

		scope.register = function(){
			ProjectService.register(scope.project).success(function(data){
				$rootScope.$emit('add-project-message', {type: 'success', message: 'Project was added successfully'});
				$rootScope.$emit('list-all-projects');
				$rootScope.$emit('add-projects-close');
			}).error(function(data){
				$rootScope.$emit('add-project-message', {type: 'error', message: data.message});
			});
		};
	};

	return {
		restrict: 'C',
		link: linker,
		templateUrl: '/views/pages/add-project.html'
	}
}])
.directive('addProjectMessage', ['$rootScope', function($rootScope){
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
		$rootScope.$on('add-project-message', function (event, args){
			setContent(args.type, args.message);
		});
	};

	return {
		restrict: 'C',
		link: linker
	}
}]);;