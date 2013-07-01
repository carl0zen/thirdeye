

angular.module('myApp',[]).
	config(function($routeProvider, $locationProvider){

		$routeProvider.
			when('/', {templateUrl: '/views/main.html'}).
			when('/view1', {templateUrl: '/views/view1.html'}).
			when('/view2', {templateUrl: '/views/view2.html'}).
			otherwise({ redirectTo: '/' });
	});


function HomeCtrl($scope){

	$scope.viewsUrl = '/views/';
	$scope.total = "Learn angular";
}