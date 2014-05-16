App.controller("UsersController",["store","generator","constants","$scope","users",function(store,generator,constants,$scope,users){
	var totalUsers = users;
	$scope.filteredUsers = users;
	$scope.addUser = function(){
		store.create("user",generator.generateFakeUser());
		totalUsers = store.readAll("user");
	}

	//Watch the searchText value and perform search. Currently a simple text based
	//filtering of the results. 
	$scope.$watch('searchText',function(value){
		if((value != undefined) && (value != "")){
			$scope.filteredUsers = totalUsers.filter(function(user){
        		return user.name.toLowerCase().indexOf(value.toLowerCase()) != -1;
        	})
		}
		else{
			//set to original results when search box is empty.
			$scope.filteredUsers = totalUsers;
		}
    });

    //Pagination related code
    $scope.perPageResultsOptions = [5,10,15]
    $scope.resultsPerPage = $scope.perPageResultsOptions[1]

    $scope.$watch('resultsPerPage',function(value){
    	console.log("set per page results to");
    	console.log(value);
    })
}])