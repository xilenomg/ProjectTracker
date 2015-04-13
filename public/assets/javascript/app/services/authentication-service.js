projectTrackerApp.service('AuthenticationService', ['$cookies', '$location', function($cookies, $location){
	var isUserLoggedIn = function(){
		return !!$cookies.uid && !!$cookies.name && !!$cookies.checkup;
	};

	var userLogout = function(){
		$cookies.remove('uid');
		$cookies.remove('name');
		$cookies.remove('checkup');

		return !isUserLoggedIn();
	};

	var requireLogin = function(){
		if ( !isUserLoggedIn() ){
			$location.path("/");
		}
	};

	return {
		isUserLoggedIn: isUserLoggedIn,
		userLogout: userLogout,
		requireLogin: requireLogin
	}
}]);