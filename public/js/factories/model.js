// set up factory with data, call it Storage
App.factory('appStorage', function($http){
	var factory 	= 	{};

	// login or register
	factory.join = function(info, callback){
		console.log(info);
		$http.post('/users', info).success(function(output){	
			callback(output);
		});
	};

	// Get User when view is initialized
	factory.getUser = function(callback){
		$http.get('/users').success(function(output){
			callback(output);
		});		
	};

	return factory;
});