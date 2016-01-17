App.controller('appController', function($scope, $location, appStorage){

    $scope.post = "";
    $scope.join = function(){
        // Angular front end validations for joining
        if(!$scope.username){
            $scope.notice = { msg: "Username cannot be blank."};
            $scope.password = "";
            return false;
        }
        if(!$scope.password){
            $scope.notice = { msg: "Password cannot be blank."};
            return false;
        }
        // Validations passed, send username and password to server side
        var info = { name: $scope.username, pass: $scope.password };        
        appStorage.join(info, function(data){
            $scope.person = data;
            $scope.loggedIn = true;
            $scope.password = "";
            $scope.notice = { msg: "Hello " + $scope.person.username };
        });
    };

});