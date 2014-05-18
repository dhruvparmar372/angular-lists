App.controller("UsersController",["store","generator","constants","paginator","search","$scope","users",function(store,generator,constants,paginator,search,$scope,users){
	var totalUsers = users;
	$scope.filteredUsers = users;

	$scope.deleteUser = function(user){
		store.deleteRecord("user",user.id);
		$scope.filteredUsers = store.readAll("user")
		$scope.setCurrentPage($scope.currentPage);
	}

	search.setKeyPropertyMap({
		role:"Role",
		name:"Name",
		status:"Status",
		dob:"DOB"
	},"name");
	// console.log(search.giveTypeAndString("Role:Admin"));
	// console.log(search.giveTypeAndString("Name:Admin"));
	// console.log(search.giveTypeAndString("Admin"));
	// console.log(search.giveTypeAndString("Dhruv"));
	// console.log(search.giveTypeAndString(":Dhruv"));
	// console.log(search.giveTypeAndString("Dhruv:"));
	// console.log(search.giveTypeAndString("Status:Dhruv"));
	//Watch the searchText value and perform search. Currently a simple text based
	//filtering of the results. 
	$scope.$watch('searchText',function(value){
		// if((value != undefined) && (value != "")){
		// 	$scope.filteredUsers = totalUsers.filter(function(user){
  //       		return user.name.toLowerCase().indexOf(value.toLowerCase()) != -1;
  //       	})
		// }
		// else{
		// 	//set to original results when search box is empty.
		// 	$scope.filteredUsers = totalUsers;
		// }
		$scope.filteredUsers = search.performSearch(totalUsers,value);
		$scope.setCurrentPage(1);
    });

    //Pagination related code
    $scope.perPageResultsOptions = [5,10,15]
    $scope.resultsPerPage = $scope.perPageResultsOptions[1]
    $scope.pagesToShow = 10;	//set the number of pages that will be shown in the pagination list.
    $scope.setCurrentPage = function(number){
	    $scope.pageObjects = paginator.generatePageObjects($scope.resultsPerPage,$scope.filteredUsers.length,number,$scope.$pagesToShow)
    	$scope.pagedUsers = paginator.filterResults(number,$scope.filteredUsers,$scope.resultsPerPage)
    	$scope.metaString = paginator.getFilterMetaString(number,$scope.filteredUsers,$scope.resultsPerPage);
    	$scope.currentPage = number;
    	//call current page recursively till our paged users have a certain length.
    	//takes care of the conditions when we delete first entry from a page. 
    	if(($scope.pagedUsers.length == 0) && (number>1)){
    		$scope.setCurrentPage(--number);
    	}
    }
    $scope.setCurrentPage(1);
    $scope.$watch('resultsPerPage',function(){
	    $scope.setCurrentPage(1);
    })
}])