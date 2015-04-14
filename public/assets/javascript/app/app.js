var projectTrackerApp = angular.module('projectTrackerApp', [
	'ng',
	'ngRoute',
	'ngResource',
	'ngMessages',
	'ngCookies',
	'angularModalService',
	'draganddrop'
]);

projectTrackerApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		title: 'Welcome to ProjectTracker',
		templateUrl : 'views/pages/login.html',
		controller : 'LoginController'
	})
	.when('/projects',{
		title: 'Projects',
		templateUrl: 'views/pages/projects.html',
		controller: 'ProjectsController'
	})
	.when('/projects/:id_project/releases',{
		title: 'Project Releases',
		templateUrl: 'views/pages/project_releases.html',
		controller: 'ProjectReleasesController'
	})
	.when('/projects/:id_project/releases/:id_release',{
		title: 'Project Releases Cards',
		templateUrl: 'views/pages/project_release_cards.html',
		controller: 'ProjectReleaseCardsController'
	});
}]);