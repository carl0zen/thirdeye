

angular.module('myApp',[]).
	config(function($routeProvider){
		$routeProvider.
			when('/home', {templateUrl: '/views/main.html', controller: 'HomeCtrl'}).
			when('/view1', {templateUrl: '/views/view1.html', controller: 'HomeCtrl'}).
			otherwise({redirectTo:'/home'});
	});


function HomeCtrl($scope){


	$scope.total = "Learn angular";
}