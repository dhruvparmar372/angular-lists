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