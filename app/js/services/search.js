App.service("search",[function(){
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