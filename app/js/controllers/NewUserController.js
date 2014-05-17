App.controller("NewUserController",["store","generator","constants","$scope",function(store,generator,constants,$scope){
	$scope.submitForm = function(isValid){
		if(isValid){
			var user = $scope.user;
			store.create("user",user);
			//setting the form inputs back to pristine state so that form state is completely reset.
			$scope.userForm.$setPristine();
			$scope.resetForm();
		}
	}
	$scope.resetForm = function(){
		$scope.user = {}
		$scope.roleOptions = constants.availableRoles;
		$scope.statusOptions = constants.possibleStatus;
		$scope.user.status = $scope.statusOptions[0];	
		$scope.user.role = $scope.roleOptions[0];
	}
	$scope.resetForm();
}])