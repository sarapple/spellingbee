// put the angular objects moduel in variable
var App = angular.module('App', ['ngRoute']);
App.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/',
		{
			templateUrl: '/clientviews/partials/login.html',
		    // controller: 'appController'
		})
		.when('/login',
		{
			templateUrl: '/clientviews/partials/login.html',
		    // controller: 'appController'
		})
		.when('/profile',
		{
			templateUrl: '/clientviews/partials/profile.html',
		    // controller: 'appController'
		})
		.otherwise({
			redirectTo: '/'
		});
});
