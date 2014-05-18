App.service("store",function(){
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
		return records.reduce(function(prevRecord,curRecord){
			if(prevRecord.id > curRecord.id){
				return prevRecord;
			}
			else{
				return curRecord;
			}
		}).id
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