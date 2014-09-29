'use strict';

var App = angular.module("app",['ui.router',"ngAnimate"]).config(["$stateProvider","$locationProvider","$urlRouterProvider", function($stateProvider,$locationProvider,$urlRouterProvider){
	debugger;
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise("/users");
	$stateProvider.state('users',{
		url:'/users', //root route for the application
		templateUrl: "partials/users.html",
		controller: 'UsersController',
		resolve: {
			users: function(store,constants,generator){
				//read all the existing user records and create some fake ones when entering into
				//users route. If store.readAll() returns a promise then transition will wait for it to resolve
				var users = store.readAll("user"); 
				if(users.length < constants.maxUsers){
					//Generate Fake Users
					console.log("generating fake stuff");
					var i = constants.fakeUserCount;
					while(i>0){
						var user = generator.generateFakeUser();
						store.create("user",user);
						i--;
					}
				}
				return store.readAll("user");
			}
		}
	}).state("newUser",{
		url:'/user-new',
		templateUrl: "partials/new-user.html",
		controller:"NewUserController",
	}).state("showUser",{
		url:'/user/:id',
		controller:"UserController",
		templateUrl:'partials/user-show.html',
		resolve:{
			user:function($stateParams,store){
				return store.read("user",$stateParams.id)
			}
		}
	}).state("editUser",{
		url:'/edit/:id',
		controller:"EditUserController",
		templateUrl:'partials/new-user.html',
		resolve:{
			user:function($stateParams,store){
				return store.read("user",$stateParams.id)
			}
		}
	})
	// Without server side support html5 must be disabled.
	return $locationProvider.html5Mode(false);	
}]);
// App.controller('AppCtrl', [
	// '$scope', '$location', '$resource', '$rootScope', function($scope, $location, $resource, $rootScope) {
		// Uses the url to determine if the selected
		// menu item should have the class active.
		// $scope.$location = $location;
		// $scope.$watch('$location.path()', function(path) {
			// return $scope.activeNavId = path || '/';
		// });
		/* getClass compares the current url with the id.
		 * If the current url starts with the id it returns 'active'
		 * otherwise it will return '' an empty string. E.g.
		 *
		 *   # current url = '/products/1'
		 *   getClass('/products') # returns 'active'
		 *   getClass('/orders') # returns ''
		 */
		// return $scope.getClass = function(id) {
			// if($scope.activeNavId.substring(0, id.length) === id) {
// 				return 'active';
// 			} else {
// 				return '';
// 			}
// 		};
// 	}
// ])

App.controller("AppController",["store","$scope","$location",function(store,$scope,$location){
	store.initiateStore();
}])
;App.controller("EditUserController",["$state","store","constants","$scope","user",function($state,store,constants,$scope,resolvedUser){
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
;App.controller("NewUserController",["$state","store","generator","constants","$scope",function($state,store,generator,constants,$scope){
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
;App.controller("UserController",["store","$scope","user",function(store,$scope,user){
	$scope.pageClass = "show-user";
	$scope.user = user;
}])
;App.controller("UsersController",["store","generator","constants","paginator","search","$scope","users",function(store,generator,constants,paginator,search,$scope,users){
	$scope.pageClass = "user-list";
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

	//Watch the searchText value and perform search. Currently a simple text based
	//filtering of the results. 
	$scope.$watch('searchText',function(value){
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
;'use strict';
/* Directives*/

// register the module with Angular
App.directive('appVersion', [ // require the 'app.service' module
	'version','service', function(version) {
		return function(scope, elm, attrs) {
			return elm.text(version);
		};
	}
]);
"use strict";

//Use this as an object for containing App wide constants. So we do not have to do
//multiple changes if we decide to change some constants. 

App.factory("constants",function(){
	return {
		fakeUserCount: 20,
		maxUsers: 20, //maximum number of users that will be generated.
		availableRoles:["Admin","Staff","Manager","Member"],
		possibleStatus:["Active","Inactive","Blocked","Pending"]
	}
})
;'use strict';
/* Filters*/

App.filter('interpolate', [
	'version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}
]);

//Controller responsible for generating fake data

App.service("generator",[ "constants", function(constants){
		var constants = constants;
		this.generateFakeUser = function(){
			return {
				name:Faker.Name.findName(),
				dob:moment(Faker.Date.between(1970,2000)).format("DD/MM/YYYY"),
				photo:"icon"+Math.floor(Math.random()*12+1).toString(),
				status:constants.possibleStatus[Math.floor(Math.random()*constants.possibleStatus.length)],
				role:constants.availableRoles[Math.floor(Math.random()*constants.availableRoles.length)],
				registration_date:moment(Faker.Date.recent(2014)).format("DD/MM/YYYY")
			}
		}
	}]
)
;App.service("paginator",[function(){
	this.appendPrevNext = true;
	var getStartEndPage = function(pageNumbers,currentPage,pagesToShow){
    	//This method will return an object with start and end page values.
    	//Doesnt need to be exposed to other modules.
		var pagesObj = {startPage:0,endPage:0}
		var floorVal = Math.floor(pagesToShow/2);
		if((currentPage-floorVal)< 1){
			pagesObj.startPage = 1;
			if(pageNumbers<=pagesToShow){
    			pagesObj.endPage = pageNumbers;
			}
			else{
				pagesObj.endPage = pagesToShow;
			}
		}	
		else if((currentPage+floorVal) > pageNumbers){
			pagesObj.endPage = pageNumbers;
			if(pageNumbers<=pagesToShow){
    			pagesObj.startPage = pagesObj.endPage - (pageNumbers-1);
			}
			else{
    			pagesObj.startPage = pagesObj.endPage - (pagesToShow-1);
			}
		}
		else{
			pagesObj.startPage = currentPage-floorVal;
			pagesObj.endPage = currentPage+floorVal;
		}
		return pagesObj;
	}

	this.generatePageObjects = function(pageCount,itemCount,currentPage,pagesToShow){
   		var pageNumbers = Math.ceil(itemCount/pageCount);
    	var pagesToShow = pagesToShow || pageNumbers;
    	var startPage = getStartEndPage(pageNumbers,currentPage,pagesToShow).startPage;
    	var endPage = getStartEndPage(pageNumbers,currentPage,pagesToShow).endPage;
    	var i=startPage;
    	var pageObjects = [];
    	while(i<=endPage){
    		var pageObject = {
    			active:(i==currentPage),
    			number:i,
    			title:i++
    		}
    		pageObjects.push(pageObject);
    	}
    	//Addding previous and next page objects. 
    	if(this.appendPrevNext){
    		if(currentPage != 1){
	    		var prevObject = {
	    			active:false,
	    			number:currentPage-1,
	    			title:"Previous"
	    		}
	    		pageObjects.unshift(prevObject);
    		}
    		if(currentPage != pageNumbers){
    			var nextObject = {
    				active:false,
    				number:currentPage+1,
    				title:"Next"	
    			}
    			pageObjects.push(nextObject);	
    		}
    	}
    	return pageObjects;
	}
	this.filterResults = function(currentPage,items,pageCount){
		//filter the items on the basis of the current page value and the total number
		//of pages.
		if(currentPage<1){	return []; }
		var startIndex = (currentPage-1)*pageCount;
		var endIndex = (currentPage)*pageCount;
		return items.slice(startIndex,endIndex);
	}
	this.getFilterMetaString = function(currentPage,items,pageCount){
		if(items.length == 0){return "";}
		var firstRes = ((currentPage-1)*pageCount)+1;
		var lastRes = (currentPage)*pageCount;
		if(lastRes<=items.length){
			var metaString = "Showing "+firstRes+" - "+lastRes+" of "+items.length+" results.";
		}else{
			var metaString = "Showing "+firstRes+" - "+items.length+" of "+items.length+" results.";
		}
		if(items.length==1){
			var metaString = "Showing 1 of 1 result.";
		}
		return metaString;
	}
}])
;App.service("search",[function(){
	/*
		We are supporting text search on various property values of the 
		records in the array. User inputs a single string having a unique
		identifier to map to the property and then the search string
		
		e.g input = "role:Admin", this will do text search on all objects
		and return those who have their role property set to 'Admin'
	*/
	this.setKeyPropertyMap = function(object,defaultProp){
		this.keyPropertyMap = object;
		//take first key as default search property if not specified by user.
		this.defaultProperty = defaultProp || Object.keys(object)[0];
	}

	//Return an object consisting of key and search string to be used
	//for search. If no match is found then we use default key. 
	var giveTypeAndString = function(string){
		if(string.indexOf(":")>0){
			var strings = string.split(":");
			var map = this.keyPropertyMap;
			var matchedKey;
			var keyDidMatch=false;
			for(var key in map){
				if(map[key].indexOf(strings[0])!=-1){
					matchedKey = key;
					keyDidMatch = true;
					break;	
				}else{
					keyDidMatch = false; 
					matchedKey = this.defaultProperty;
				}
			}
			if(keyDidMatch){
				return{
					key:matchedKey,
					search:strings[1]
				}	
			}else{
				return{
					key:matchedKey,
					search:string
				}	
			}
		}
		else{
			return{
				key:this.defaultProperty,
				search:string
			}
		}
	}

	this.performSearch = function(items,string){
		if((string == undefined) || (string == "")){
			return items;
		}
		else{
			var searchObj = giveTypeAndString.call(this,string);
			return items.filter(function(item){
				var propVal = item[searchObj['key']];
				var stringVal = searchObj['search'];
				if(propVal.toLowerCase().indexOf(stringVal.toLowerCase())>0){
					//fix for getting surnames in search results.
					return propVal[(propVal.toLowerCase().indexOf(stringVal.toLowerCase()))-1] == " ";
				}
				return propVal.toLowerCase().indexOf(stringVal.toLowerCase()) == 0 
			})
		}
	}

}])
;App.service("store",function(){
	//Store will act as a mediator between the data provider and our application. Will implement basic
	//CRUD operations here which will be exposed to our application as a service. 
	this.initiateStore = function(){
		if(localStorage.getItem("appStore") === null){
			this.recordsContainer = {};
			localStorage.setItem("appStore",JSON.stringify(this.recordsContainer));
		}
		else{
			this.loadStore();
		}
	}

	this.fetchStore = function(){
		//save some lines of code by abstracting out in a function. A simple ORM.
		return this.recordsContainer;
	}
	this.persistStore = function(){
		localStorage.setItem("appStore",JSON.stringify(this.fetchStore()));
	}
	this.loadStore = function(){
		this.recordsContainer = JSON.parse(localStorage.getItem("appStore"));
	}

	this.lastRecordId = function(type){
		var store = this.fetchStore();
		var records = store[type];
		if(records.reduce){
			return records.reduce(function(prevRecord,curRecord){
				if(prevRecord.id > curRecord.id){
					return prevRecord;
				}
				else{
					return curRecord;
				}
			}).id
		}
		else{
			return 0;
		}
		
	}

	this.create = function(type,record){
		//1. get the key storing values of the `type` to be created.
		//2. add an entry to the existing array of records.
		//3. save back the stringified version
		var store = this.fetchStore();
		var type =  type.toString();
		if(store.hasOwnProperty(type)){
			var records = store[type];
			record["id"] = this.lastRecordId(type)+1;
			records.push(record);
		}
		else{
			record["id"] = 1;
			store[type] = [record];
		}
		this.persistStore();
		return record;
	}
	this.read = function(type,id){
		var store = this.fetchStore();
		var type =  type.toString();
		var records = store[type] || []
		return records.filter(function(record){return record.id == id})[0]
	}
	this.readAll = function(type){
		var store = this.fetchStore();
		var type =  type.toString();
		return store[type] || [];
	}

	this.update = function(type,data){
		if(data.id === undefined || data.id < 1){return {};}
		var store = this.fetchStore();
		var type =  type.toString();
		var record = this.read(type,data.id);
		if(!(record === undefined)){
			for(var key in data){
				//(Object.keys(record).indexOf(key) != -1) add this if we need to prevent update
				//action from adding keys to the original object.
				if(key.toString() != "id"){
					//don't allow for id modification
					record[key] = data[key];
				}
			}
			//Replace the record in records array by our new record.
			var records = store[type] || [];
			records.filter(function(recrd){
				return recrd.id == record.id;
			})[0] = record;
			this.persistStore();
			return record;
		}
		return{};
	}
	this.deleteRecord = function(type,id){
		var record = this.read(type,id);
		var records = this.readAll(type);
		if(records.indexOf(record) != -1){
			records.splice(records.indexOf(record),1);
			this.persistStore();
			return record;
		}
		else{
			return {};
		}
	}
	
})
;'use strict';
/* Services*/

App.factory('version', function() {
	return "0.4.0";
});


//# sourceMappingURL=app.js.map