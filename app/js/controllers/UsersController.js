App.controller("UsersController",["store","generator","constants","paginator","$scope","users",function(store,generator,constants,paginator,$scope,users){
	var totalUsers = users;
	$scope.filteredUsers = users;
	$scope.addUser = function(){
		store.create("user",generator.generateFakeUser());
		totalUsers = store.readAll("user");
		$scope.setCurrentPage(1);
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
		$scope.setCurrentPage(1);
    });

    //Pagination related code
    $scope.perPageResultsOptions = [5,10,15]
    $scope.resultsPerPage = $scope.perPageResultsOptions[1]
    $scope.pagesToShow = 10;	//set the number of pages that will be shown in the pagination list.
    $scope.setCurrentPage = function(number){
	    $scope.pageObjects = paginator.generatePageObjects($scope.resultsPerPage,$scope.filteredUsers.length,number,$scope.$pagesToShow)
    	$scope.pagedUsers = paginator.filterResults(number,$scope.filteredUsers,$scope.resultsPerPage)
    }
    $scope.setCurrentPage(1);
    $scope.$watch('resultsPerPage',function(){
	    $scope.setCurrentPage(1);
    })
}])