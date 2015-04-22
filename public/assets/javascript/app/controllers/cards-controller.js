projectTrackerApp.
controller('ProjectReleaseCardsController', ['$scope', '$route', '$rootScope', 'ProjectService', 'ReleaseService', 'CardService', 'filterFilter', function($scope, $route, $rootScope, ProjectService, ReleaseService, CardService, filterFilter) {
		var params = $route.current.params;
		var id_project = params.id_project;
		var id_release = params.id_release;

		var loadCards = function(id_project, id_release) {
			CardService.listCardsFromRelease(id_project, id_release).success(function(cards) {
				$scope.cards = cards;

				$scope.plannedCards = filterFilter($scope.cards, function(item, index) {
					if (item.status === 'planned') {
						return item;
					}
				});

				$scope.devCards = filterFilter($scope.cards, function(item, index) {
					if (item.status === 'dev') {
						return item;
					}
				});

				$scope.testCards = filterFilter($scope.cards, function(item, index) {
					if (item.status === 'test') {
						return item;
					}
				});

				$scope.doneCards = filterFilter($scope.cards, function(item, index) {
					if (item.status === 'done') {
						return item;
					}
				});

			});
		};

		//Listener to relist all cards
		$rootScope.$on('list-all-cards', function(event, args) {
			loadCards(id_project, id_release);
		});

		$rootScope.$on('add-cards-close', function(event, args) {
			$scope.showAddCard = false;
		});

		//hide add card overlay
		$scope.showAddCard = false;

		ProjectService.listOne(id_project).success(function(project) {
			if (project) {
				$scope.project = project
				ReleaseService.listOne(id_project, id_release).success(function(release) {
					if (release && release.length > 0) {
						$scope.release = release[0];
						loadCards(id_project, id_release);
					}
				});
			}
		});


		//show or hide add card overlay
		$scope.toggleAddCard = function() {
			$scope.showAddCard = $scope.showAddCard ? false : true;
		};

	}])
	.directive('addCard', ['$rootScope', 'CardService', function($rootScope, CardService) {

		var linker = function(scope, element, attrs) {
			var clearCardScope = function() {
				scope.card = {
					title: null,
					description: null,
					status: null,
					estimated_time: null,
					id_release: (scope.card && scope.card.id_release ? scope.card.id_release : null)
				};
			};

			clearCardScope();

			attrs.$observe('idRelease', function() {
				scope.card.id_release = attrs.idRelease;
			});

			scope.register = function() {
				CardService.register(scope.card).success(function(data) {
					$rootScope.$emit('add-card-message', {
						type: 'success',
						message: 'Card was added successfully'
					});
					$rootScope.$emit('list-all-cards');
					$rootScope.$emit('add-cards-close');
					clearCardScope();
				}).error(function(data) {
					$rootScope.$emit('add-card-message', {
						type: 'error',
						message: data.message
					});
				});
			};
		};

		return {
			restrict: 'C',
			link: linker,
			templateUrl: '/views/pages/add-card.html'
		}
	}])
	.directive('showCard', ['$rootScope', 'CardService', function($rootScope, CardService) {

		var link = function(scope, element, attrs) {
			scope.show = function() {
				element.removeClass('hide');
			};

			scope.hide = function() {
				element.addClass('hide');
			};

			scope.listOne = function(id_card) {
				scope.card = {};
				CardService.listOne(id_card).success(function(card) {
					if (card) {
						scope.show();
						scope.card = card;
					}
				});
			};

			scope.updateField = function(field, value) {
				var time_pattern = /[0-9]{2}:[0-5][0-9]/;
				if (time_pattern.test(value)) {
					CardService.updateCardField(scope.card.id, field, value).success(function(card) {
						console.log("updated");
					});
				}
				console.log(field, value);
			};

			$rootScope.$on('show-card', function(event, data) {
				if (data && data.id_card) {
					scope.listOne(data.id_card);
				}
			});
		};



		return {
			restrict: 'E',
			templateUrl: '/views/pages/card.html',
			link: link
		}
	}])
	.directive('addCardMessage', ['$rootScope', function($rootScope) {
		var linker = function(scope, element, attrs) {
			var setContent = function(type, message) {
				// remove css classes
				element.removeClass('bg-success').removeClass('bg-danger');

				//add proper css class
				if (type === 'success') {
					element.addClass('bg-success');
				} else if (type === 'error') {
					element.addClass('bg-danger');
				}

				//change element message
				element.html(message);
			};

			//Listen to event signup-message
			$rootScope.$on('add-card-message', function(event, args) {
				setContent(args.type, args.message);
			});
		};

		return {
			restrict: 'C',
			link: linker
		}
	}])
	.directive('columnCard', ['$rootScope', '$timeout', 'CardService', function($rootScope, $timeout, CardService) {

		var linker = function(scope, element, attrs) {
			$timeout(function() {
				scope.name = attrs.name;
				scope.title = attrs.title;
			}, 200);

			scope.onDrop = function(column, data, event) {
				console.log(column, data, event);
				var cardObjectData = data['json/custom-object'];
				CardService.updateColumnCard(cardObjectData.id, column).success(function() {
					$rootScope.$emit('list-all-cards');
				});
			};

			scope.onDragOver = function(event) {};

			scope.showCard = function(id_card) {
				$rootScope.$emit('show-card', {
					id_card: id_card
				});
			};

			scope.isEmpty = function(collection) {
				if (typeof collection === "undefined" || collection.length === 0) {
					return 'collection-empty';
				} else {
					return 'collection-not-empty';
				}
			};
		};

		return {
			restrict: 'E',
			link: linker,
			scope: {
				collection: "="
			},
			templateUrl: '/views/pages/column-card.html'
		}
	}]);