projectTrackerApp.
controller('ProjectReleaseCardsController', ['$scope', '$route', 'ProjectService', 'ReleaseService', 'CardService', 'filterFilter', function($scope, $route, ProjectService, ReleaseService, CardService, filterFilter) {
	var params = $route.current.params;
	var id_project = params.id_project;
	var id_release = params.id_release;

	var loadCards = function(id_project, id_release) {
		CardService.listCardsFromRelease(id_project, id_release).success(function(cards) {
			$scope.cards = cards;

			$scope.plannedCards = filterFilter($scope.cards, function(item, index){
				if ( item.status === 'planned' ){
					return item;
				}
			});

			$scope.devCards = filterFilter($scope.cards, function(item, index){
				if ( item.status === 'dev' ){
					return item;
				}
			});

			$scope.testCards = filterFilter($scope.cards, function(item, index){
				if ( item.status === 'test' ){
					return item;
				}
			});

			$scope.doneCards = filterFilter($scope.cards, function(item, index){
				if ( item.status === 'done' ){
					return item;
				}
			});

		});
	};

	ProjectService.listOne(id_project).success(function(project) {
		if (project) {
			$scope.project = project
			ReleaseService.listOne(id_project, id_release).success(function(release) {
				if ( release && release.length > 0 ){
					$scope.release = release[0];
					loadCards(id_project, id_release);
				}
			});
		}
	});

	$scope.isEmpty = function(collection){
		if ( typeof collection === "undefined" || collection.length === 0 ) {
			return 'collection-empty';
		}
		else{
			return 'collection-not-empty';
		}
	};

	$scope.onDrop = function(column, data, event) {
		var cardObjectData = data['json/custom-object'];
		CardService.updateColumnCard(cardObjectData.id, column).success(function() {
			loadCards(id_project, id_release);
		});
	};

	$scope.onDragOver = function(event) {};
}]);