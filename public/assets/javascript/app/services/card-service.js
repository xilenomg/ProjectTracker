projectTrackerApp.service('CardService', ['$http', function($http){
	var listCardsFromRelease = function(id_project, id_release){
		return $http.get('/api/projects/' + id_project + '/releases/' + id_release + '/cards');
	};

	var listOne = function(id_card){
		return $http.get('/api/cards/' + id_card);
	};

	var updateColumnCard = function(id_card, column){
		return $http.post('/api/cards/updateColumn', {id_card: id_card, column: column});
	};

	var updateCardField = function(id_card, field, value){
		return $http.post('/api/cards/' + id_card + '/update', {id_card: id_card, field: field, value: value});
	};

	var register = function(card){
		return  $http.post('/api/cards/register', card);
	};

	return {
		listCardsFromRelease: listCardsFromRelease,
		register: register,
		listOne: listOne,
		updateColumnCard: updateColumnCard,
		updateCardField: updateCardField
	};
}]);