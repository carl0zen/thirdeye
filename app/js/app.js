

angular.module('myApp',['hammer']).
	config(function($routeProvider, $locationProvider){

		$routeProvider.
			when('/', {templateUrl: '/views/main.html'}).
			when('/view1', {templateUrl: '/views/view1.html'}).
			when('/view2', {templateUrl: '/views/view2.html'}).
			otherwise({ redirectTo: '/' });
	})
	.controller('HomeCtrl', ['$scope', function($scope){
		$scope.hideMenu = function hideMenu(e){
		}
	}]);


function HomeCtrl($scope){

	$scope.viewsUrl = '/views/';
	$scope.total = "Learn angular";
}