'use strict';
describe("directives", function() {
	beforeEach(module("app"));
	return describe("app-version", function() {
		return it("should print current version", function() {
			module(function($provide) {
				$provide.value("version", "TEST_VER");
			});
			return inject(function($compile, $rootScope) {
				var element;
				element = $compile("<span app-version></span>")($rootScope);
				return expect(element.text()).toEqual("TEST_VER");
			});
		});
	});
});