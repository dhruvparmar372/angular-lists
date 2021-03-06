
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