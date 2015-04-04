projectTrackerApp.controller('AuthenticationService', ['$cookies',function($cookies){
	var isUserLoggedIn = function(){
		return !!$cookies.uid && !!$cookies.name && !!$cookies.checkup;
	};

	var userLogout = function(){
		$cookies.remove('uid');
		$cookies.remove('name');
		$cookies.remove('checkup');

		return !isUserLoggedIn();
	};

	return {
		isUserLoggedIn: isUserLoggedIn,
		userLogout: userLogout
	}
}]);