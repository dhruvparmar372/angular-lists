App.controller("EditUserController",["$state","store","constants","$scope","user",function($state,store,constants,$scope,resolvedUser){
	$scope.pageClass = "edit-user";
	$scope.submitForm = function(isValid){
		if(isValid){
			var user = $scope.user;
			store.update("user",user);
			$state.go("showUser",{id:user.id})
		}
	}
	$scope.resetForm = function(){
		$scope.user = resolvedUser;
		$scope.roleOptions = constants.availableRoles;
		$scope.statusOptions = constants.possibleStatus;
	}
	$scope.resetForm();
}])