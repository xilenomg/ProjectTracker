projectTrackerApp
.controller('LoginController', ['$scope', '$rootScope', '$location', '$timeout', 'UserService', 'AuthenticationService', function($scope, $rootScope, $location, $timeout, UserService, AuthenticationService){
	//ng-model to signup
	$scope.user_signup = {firstName: null, lastName:null, email: null, password: null, confirm_password: null};

	//ng-model to signin
	$scope.user_signin = {email: null, password: null};

	if ( AuthenticationService.isUserLoggedIn() ){
		$location.path('/projects');
	}

	//form submit to authenticate
	$scope.authenticate = function(){
		UserService.authenticate($scope.user_signin)
		.success(function(data, status, headers, config){
			$rootScope.$emit('signin-message', {type: 'success', message: 'User is now signed in'});
			$timeout(function(){
				$location.path('/projects');
			}, 500);
		})
		.error(function(data, status, headers, config){
			$rootScope.$emit('signin-message', { type: 'error', message: data.error_message });
		});
	};

	//form submit to register
	$scope.register = function(){
		UserService.register($scope.user_signup)
		.success(function(data, status, headers, config){
			$rootScope.$emit('signup-message', {type: 'success', message: 'User successfully registered'});
		})
		.error(function(data, status, headers, config){
			$rootScope.$emit('signup-message', { type: 'error', message: data.error_message });
		});
	};

}])
.directive('signinMessage', ['$rootScope',function($rootScope){
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

		//Listen to event signin-message
		$rootScope.$on('signin-message', function (event, args){
			setContent(args.type, args.message);
		});
	};

	return {
		restrict: 'C',
		link: linker
	}
}])
.directive('signupMessage', ['$rootScope', function($rootScope){
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
		$rootScope.$on('signup-message', function (event, args){
			setContent(args.type, args.message);
		});
	};

	return {
		restrict: 'C',
		link: linker
	}
}]);