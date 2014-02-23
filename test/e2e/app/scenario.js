"use strict";


/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe("my app", function() {
	beforeEach(function() {
		return browser().navigateTo("/#!");
	});

	it("should automatically redirect to /todo when location hash/fragment is empty", function() {
		return expect(browser().location().url()).toBe("/todo");
	});

	it("should navigate to /view when the View link in nav is clicked", function() {
		element('.nav a[href="#/view"]').click();
		return expect(browser().location().url()).toBe("/view");
	});

	describe("todo", function() {
		it("should list 2 items", function() {
			return expect(repeater("[ui-view] ul li").count()).toEqual(2);
		});

		it("should display checked items with a line-through", function() {
			return expect(element("[ui-view] ul li input:checked + span").css("text-decoration")).toEqual("line-through solid rgb(51, 51, 51)");
		});

		it("should sync done status with checkbox state", function() {
			element("[ui-view] ul li input:not(:checked)").click();
			expect(element("[ui-view] ul li span").attr("class")).toEqual("donetrue");
			element("[ui-view] ul li input:checked").click();
			return expect(element("[ui-view] ul li span").attr("class")).toEqual("donefalse");
		});

		it("should remove checked items when the archive link is clicked", function() {
			element("[ui-view] a[ng-click=\"archive()\"]").click();
			return expect(repeater("[ui-view] ul li").count()).toEqual(1);
		});

		return it("should add a newly submitted item to the end of the list and empty the text input", function() {
			var newItemLabel = "test newly added item";
			input("todoText").enter(newItemLabel);
			element('[ui-view] button[type="submit"]').click();
			expect(repeater("[ui-view] ul li").count()).toEqual(3);
			expect(element("[ui-view] ul li:last span").text()).toEqual(newItemLabel);
			return expect(input("todoText").val()).toEqual("");
		});
	});
	describe("view", function() {
		beforeEach(function() {
			return browser().navigateTo("#!/view");
		});
		return it("should render view when user navigates to /view", function() {
			return expect(element("[ui-view] p:first").text()).toMatch(/partial for view 1/);
		});
	});
});