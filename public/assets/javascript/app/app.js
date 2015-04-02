var projectTrackerApp = angular.module('projectTrackerApp', [
	'ng',
	'ngRoute',
	'ngResource',
	'ngMessages',
	'ngCookies',
	'angularModalService'
]);

projectTrackerApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		title: 'Welcome to ProjectTracker',
		templateUrl : 'views/pages/login.html',
		controller : 'LoginController'
	});
}]);