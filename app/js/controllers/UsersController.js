App.controller("UsersController",["store","generator","constants","$scope","users",function(store,generator,constants,$scope,users){
	var totalUsers = users;
	$scope.filteredUsers = users;
	$scope.addUser = function(){
		store.create("user",generator.generateFakeUser());
		totalUsers = store.readAll("user");
	}
	$scope.$watch('searchText',function(value){
		if((value != undefined) && (value != "")){
			$scope.filteredUsers = totalUsers.filter(function(user){
        		return user.name.toLowerCase().indexOf(value.toLowerCase()) != -1;
        	})
		}
		else{
			$scope.filteredUsers = totalUsers;
		}
    });
}])