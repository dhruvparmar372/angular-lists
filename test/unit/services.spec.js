'use strict';


describe('Store Service Test', function(){
    beforeEach(module('app'));
    
    it('has all initialization and store functions', inject(function(store){ 
        expect( store.initiateStore ).toBeDefined();
        expect( store.fetchStore ).toBeDefined();
        expect( store.loadStore ).toBeDefined();
        expect( store.persistStore ).toBeDefined();
    }))

    //Tesing Existence of CRUD Functions.
    it('has all CRUD functions', inject(function(store){ 
        expect( store.create ).toBeDefined();
        expect( store.read ).toBeDefined();
        expect( store.readAll ).toBeDefined();
        expect( store.update ).toBeDefined();
        expect( store.deleteRecord ).toBeDefined();
    }))

    it("should have recordsContainer set only when initiateStore is called", inject(function(store){
    	expect(store.recordsContainer).toBeUndefined();
    	store.initiateStore();
    	expect(store.recordsContainer).toBeDefined();
    }))

    it("should load recordsContainer from localStorage appStore property", inject(function(store){
    	localStorage.clear();
    	expect(store.recordsContainer).toBeUndefined();
    	localStorage.setItem("appStore",JSON.stringify([{name:"Dhruv"},{name:"Parmar"}]))
    	store.initiateStore();
    	expect(store.recordsContainer[0]).toBeDefined();
    	expect(store.recordsContainer[1]).toBeDefined();
    	var first = store.recordsContainer[0];
    	var second = store.recordsContainer[1];
    	expect(first.name).toEqual('Dhruv');
    	expect(second.name).toEqual('Parmar');
    }))

    it("should returns recordsContainer when fetchStore is called",inject(function(store){
    	localStorage.clear();
    	localStorage.setItem("appStore",JSON.stringify([{name:"Dhruv"},{name:"Parmar"}]))
    	store.initiateStore();
    	var recordsContainer = store.fetchStore();
    	var first = recordsContainer[0];
    	var second = recordsContainer[1];
    	expect(first.name).toEqual('Dhruv');
    	expect(second.name).toEqual('Parmar');
    }))

    it("should persist stringifyed version of recordsContainer when persistStore is called",inject(function(store){
    	localStorage.clear();
    	store.initiateStore();
    	store['recordsContainer'] = [{name:"Dhruv"},{name:"Parmar"}];
    	store.persistStore();
    	expect( localStorage.getItem("appStore") ).toEqual(JSON.stringify(store.recordsContainer))
    }))

    it("should load recordsContainer from appStore when loadStore is called",inject(function(store){
    	localStorage.clear();
    	store.initiateStore();
    	localStorage.setItem("appStore",JSON.stringify([{name:"Dhruv"},{name:"Parmar"}]))
    	store.loadStore();
    	var store = store.fetchStore();
    	var first = store[0];
    	var second = store[1];
    	expect(first.name).toEqual('Dhruv');
    	expect(second.name).toEqual('Parmar');
    }))

    it("should add record when create method is called and return that record",inject(function(store){
    	localStorage.clear();
    	store.initiateStore();
    	var createdRecord = store.create("user",{name:"Dhruv",dob:"22/07/1991",status:"Admin"});
    	expect(createdRecord.name).toEqual("Dhruv");
    	expect(createdRecord.dob).toEqual("22/07/1991");
    	expect(createdRecord.status).toEqual("Admin");
    	expect(createdRecord.id).toEqual(1);
    	expect( localStorage.getItem("appStore") ).toContain("Dhruv")
    	expect( localStorage.getItem("appStore") ).toContain("Admin")
    	expect( localStorage.getItem("appStore") ).toContain("22/07/1991")
    }))

    it("should return record for fetched id when read is called",inject(function(store){
    	localStorage.clear();
    	store.initiateStore();
    	store.create("user",{name:"Dhruv",dob:"22/07/1991",status:"Admin"});    	
    	store.create("user",{name:"Parmar",dob:"22/07/1991",status:"Manager"});
    	var Dhruv = store.read("user",1);    	
    	var Parmar = store.read("user",2);
    	expect(Dhruv.name).toEqual("Dhruv");    	
    	expect(Dhruv.dob).toEqual("22/07/1991");    	
    	expect(Parmar.id).toEqual(2);    	
    	expect(Parmar.status).toEqual("Manager");    	
    }))

    it("should give all records for asked type when readAll is called",inject(function(store){
    	localStorage.clear();
    	store.initiateStore();
    	store.create("user",{name:"Dhruv",dob:"22/07/1991",status:"Admin"});    	
    	store.create("user",{name:"Parmar",dob:"22/07/1991",status:"Manager"});
    	var records = store.readAll("user");
    	expect(records.length).toEqual(2);
    	expect(records[0].name).toEqual("Dhruv");    	
    	expect(records[0].dob).toEqual("22/07/1991");    	
    	expect(records[1].id).toEqual(2);    	
    	expect(records[1].status).toEqual("Manager");
    }))

    it("should delete the record for type,id when deleteRecord is called",inject(function(store){
    	localStorage.clear();
    	store.initiateStore();
    	store.create("user",{name:"Dhruv",dob:"22/07/1991",status:"Admin"});    	
    	store.create("user",{name:"Parmar",dob:"22/07/1991",status:"Manager"});
    	var records = store.readAll("user");
    	expect(records.length).toEqual(2);
    	store.deleteRecord("user",2);
    	var recordsNew = store.readAll("user");
    	expect(recordsNew.length).toEqual(1);
    }))

    it("should return {} when deleteRecord is called with -ve index",inject(function(store){
    	localStorage.clear();
    	store.initiateStore();
    	store.create("user",{name:"Dhruv",dob:"22/07/1991",status:"Admin"});    	
    	store.create("user",{name:"Parmar",dob:"22/07/1991",status:"Manager"});
    	var deleted = store.deleteRecord("user",-1)
    	var deletedTwo = store.deleteRecord("user",3)
    	expect(Object.keys(deleted).length).toEqual(0);
    	expect(Object.keys(deletedTwo).length).toEqual(0);
    }))

    it("should update record when updateRecord is called",inject(function(store){
		localStorage.clear();
    	store.initiateStore();
    	var first = store.create("user",{name:"Dhruv",dob:"22/07/1991",status:"Admin"});    	
    	var second = store.create("user",{name:"Parmar",dob:"22/07/1991",status:"Manager"});
    	second.name = "Ajay";
    	var updatedSecond = store.update("user",second);
    	expect(updatedSecond.id).toEqual(2);
    	expect(updatedSecond.name).toEqual("Ajay");
    }))

    it("should return empty object if passed object has no id",inject(function(store){
    	store.initiateStore();
		expect(Object.keys(store.update("user",{})).length).toEqual(0);    	
    }))

    it("should return lastRecordsId when asked for a type",inject(function(store){
    	localStorage.clear();
    	store.initiateStore();
    	expect(store.lastRecordId("user")).toEqual(0);
    	store.create("user",{name:"Dhruv",dob:"22/07/1991",status:"Admin"});    	
    	store.create("user",{name:"Parmar",dob:"22/07/1991",status:"Manager"});
    	expect(store.lastRecordId("user")).toEqual(2);
    	store.create("user",{name:"Parmar",dob:"22/07/1991",status:"Manager"});
    	expect(store.lastRecordId("user")).toEqual(3);
    }))

});