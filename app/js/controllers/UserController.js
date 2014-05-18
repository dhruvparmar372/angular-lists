App.controller("UserController",["store","$scope","user",function(store,$scope,user){
	$scope.pageClass = "show-user";
	$scope.user = user;
}])