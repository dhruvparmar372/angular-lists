App.controller("NewUserController",["$state","store","generator","constants","$scope",function($state,store,generator,constants,$scope){
	$scope.pageClass = "new-user";
	$scope.submitForm = function(isValid){
		if(isValid){
			var user = $scope.user;
			user.photo = "icon"+Math.floor(Math.random()*12+1).toString();
			store.create("user",user);
			//setting the form inputs back to pristine state so that form state is completely reset.
			$state.go("showUser",{id:user.id})
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