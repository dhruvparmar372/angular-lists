"use strict";

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe("my app", function() {
	beforeEach(function() {
		return browser.get("/#!");
	});

	it("should automatically redirect to /todo when location hash/fragment is empty", function() {
		return expect(browser.getLocationAbsUrl()).toMatch("/todo");
	});

	it("should navigate to /view when the View link in nav is clicked", function() {
		$('.nav a[ui-sref="view()"]').click();
		return expect(browser.getLocationAbsUrl()).toMatch("/view");
	});

	describe("todo", function() {
		it("should list 2 items", function() {
			return expect(element.all(by.repeater("todo in todos")).count()).toEqual(2);
		});

		it("should display checked items with a line-through", function() {
			return expect($("[ui-view] ul li input:checked + span").getCssValue("text-decoration")).toEqual("line-through solid rgb(51, 51, 51)");
		});

		it("should sync done status with checkbox state", function() {
			$("[ui-view] ul li input:not(:checked)").click();
			expect($("[ui-view] ul li span").getAttribute("class")).toEqual("donetrue");
			$("[ui-view] ul li input:checked").click();
			return expect($("[ui-view] ul li span").getAttribute("class")).toEqual("donefalse");
		});

		it("should remove checked items when the archive link is clicked", function() {
			$("[ui-view] a[ng-click=\"archive()\"]").click();
			return expect(element.all(by.repeater("todo in todos")).count()).toEqual(1);
		});

		return it("should add a newly submitted item to the end of the list and empty the text input", function() {
			var newItemLabel = "test newly added item";
			var input = element(by.model("todoText"));
			input.sendKeys(newItemLabel);
			$('[ui-view] button[type="submit"]').click();
			expect(element.all(by.repeater("todo in todos")).count()).toEqual(3);
			expect($("[ui-view] ul li:last-child span").getText()).toEqual(newItemLabel);
			return expect(input.getAttribute('value')).toEqual("");
		});
	});

	describe("view", function() {
		beforeEach(function() {
			return browser.get("/#!/view");
		});
		return it("should render view when user navigates to /view", function() {
			return expect($("[ui-view] p:first-child").getText()).toMatch(/partial for view 1/);
		});
	});
});