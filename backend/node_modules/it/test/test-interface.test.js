"use strict";
var it = require("../index"),
    assert = require("assert"),
    Test = require("../lib/interfaces/common/test"),
    testUtil = require("./test-util");

it.describe("Test interface", function(it) {
    it.afterEach(function() {
        Test.duplicateTestErrors = [];
    });

    it.should("not allow duplicate Test descriptions (describe or suite blocks)", function() {
        var originalTestCount = Object.keys(Test.testNames).length,
            failed = false;

        new Test("xxx-dupe-test-xxx");
        assert.equal(Test.duplicateTestErrors.length, 0);
        assert.equal(Object.keys(Test.testNames).length, originalTestCount + 1);

        new Test("xxx-dupe-test-xxx");
        assert.equal(Test.duplicateTestErrors.length, 1);
        assert.isFunction(Test.checkDuplicateNames);

        try {
            Test.run()
        } catch (err) {
            assert.equal(err.message, "Found 1 duplicate describe block and/or test name. Please use unique descriptions.")
            failed = true;
        }
        assert.equal(failed, true);
    });

    it.should("not allow duplicate action names (should blocks)", function() {
        var failed = false,
            tester = new Test("xxx-dupe-nested-describe-xxx");

        tester._addAction("xxx-dupe-nested-test-xxx");
        assert.equal(Test.duplicateTestErrors.length, 0);

        tester._addAction("xxx-dupe-nested-test-xxx");
        assert.equal(Test.duplicateTestErrors.length, 1);

        try {
            Test.run();
        } catch (err) {
            assert.equal(err.message, "Found 1 duplicate describe block and/or test name. Please use unique descriptions.")
            failed = true;
        }
        assert.equal(failed, true);
    });

    it.should("allow actions in different Tests to be named the same", function() {
        var testCount = Object.keys(Test.testNames).length,
            failed = false;

        var tester = new Test("xxx-special-allow-describe-xxx");
        var tester2 = new Test("222-special-allow-describe-222");
        tester._addAction("xxx-same-name-xxx");
        tester2._addAction("xxx-same-name-xxx");

        assert.equal(Test.duplicateTestErrors.length, 0);

        try {
            Test.run();
        } catch (err) {
            assert.equal(false, true, "Should not be failing here");
            failed = true;
        }
        assert.equal(failed, false);
    });
});
