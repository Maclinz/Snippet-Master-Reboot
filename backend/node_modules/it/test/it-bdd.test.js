"use strict";
var it = require("../index"),
    assert = require("assert"),
    testUtil = require("./test-util");

it.describe("it bdd",function (it) {

    it.should("not be null", function () {
        assert.isNotNull(it);
    });

    it.should("describe", function () {
        assert.equal(it.description, "it bdd");
    });

    it.should("have methods", function () {
        assert.isFunction(it.beforeAll);
        assert.isFunction(it.beforeEach);
        assert.isFunction(it.afterEach);
        assert.isFunction(it.afterAll);
        assert.isFunction(it.should);
        assert.isFunction(it.describe);
        assert.isFunction(it.context);
    });

    it.describe("actions through it as a function", function (it) {

        it("should support actions through the it function", function () {
            assert.ok(true);
        });

    });

    it.describe("assert extensions", function (it) {

        it.should('add methods', function () {
            assert.isFunction(assert.isFunction);
            assert.isFunction(assert.isArray);
            assert.isFunction(assert.isDate);
            assert.isFunction(assert.isBoolean);
            assert.isFunction(assert.isString);
            assert.isFunction(assert.isUndefined);
            assert.isFunction(assert.isUndefinedOrNull);
            assert.isFunction(assert.isPromiseLike);
            assert.isFunction(assert.isRegExp);
            assert.isFunction(assert.isTrue);
            assert.isFunction(assert.isFalse);
            assert.isFunction(assert.truthy);
            assert.isFunction(assert.falsy);
            assert.isFunction(assert.isNull);
            assert.isFunction(assert.isNotNull);
            assert.isFunction(assert.instanceOf);
            assert.isFunction(assert.lengthOf);
        });

        it.should('test properly', function () {
            assert.doesNotThrow(function () {
                assert.isFunction(function () {
                });
            });
            assert.doesNotThrow(function () {
                assert.isArray([]);
            });
            assert.doesNotThrow(function () {
                assert.isDate(new Date());
            });

            assert.doesNotThrow(function () {
                assert.isBoolean(true);
                assert.isBoolean(false);
            });

            assert.doesNotThrow(function () {
                assert.isString("");
            });

            assert.doesNotThrow(function () {
                assert.isUndefined(undefined);
            });

            assert.doesNotThrow(function () {
                assert.isUndefinedOrNull(null);
                assert.isUndefinedOrNull(undefined);

            });

            assert.doesNotThrow(function () {
                assert.isPromiseLike({then: function () {
                }});
            });

            assert.doesNotThrow(function () {
                assert.isRegExp(/hello/i);
            });

            assert.doesNotThrow(function () {
                assert.isTrue(true);
            });

            assert.doesNotThrow(function () {
                assert.isFalse(false);
            });

            assert.doesNotThrow(function () {
                assert.truthy('hello');
            });

            assert.doesNotThrow(function () {
                assert.falsy('');
            });

            assert.doesNotThrow(function () {
                assert.isNull(null);
            });

            assert.doesNotThrow(function () {
                assert.isNotNull(true);
            });

            assert.doesNotThrow(function () {
                assert.instanceOf(new Date(), Date);
            });

            assert.doesNotThrow(function () {
                assert.lengthOf([1, 2, 3], 3);
            });

            assert.throws(function () {
                assert.isFunction(true);
            });
            assert.throws(function () {
                assert.isArray(true);
            });
            assert.throws(function () {
                assert.isDate("hi");
            });

            assert.throws(function () {
                assert.isBoolean("");
            });

            assert.throws(function () {
                assert.isString(new Date());
            });

            assert.throws(function () {
                assert.isUndefined(null);
            });

            assert.throws(function () {
                assert.isUndefinedOrNull("hi");

            });

            assert.throws(function () {
                assert.isPromiseLike("");
            });

            assert.throws(function () {
                assert.isRegExp("/hello/");
            });

            assert.throws(function () {
                assert.isTrue(false);
            });

            assert.throws(function () {
                assert.isFalse(true);
            });

            assert.throws(function () {
                assert.truthy('');
            });

            assert.throws(function () {
                assert.falsy('hi');
            });

            assert.throws(function () {
                assert.isNull(undefined);
            });

            assert.throws(function () {
                assert.isNotNull(null);
            });

            assert.throws(function () {
                assert.instanceOf(new Date(), Boolean);
            });

            assert.throws(function () {
                assert.lengthOf([1, 2, 3], 1);
            });
        });
    });

    it.describe("#beforeAll", function (it) {

        var called = 0;
        it.beforeAll(function () {
            return called++;
        });

        it.should("call beforeAll", function () {
            assert.equal(called, 1);
        });

        it.should("call not call beforeAll more than once", function () {
            assert.equal(called, 1);
        });
    });

    it.describe("#beforeAll multi", function (it) {

        var called = 0, called2 = 0;
        it.beforeAll(function () {
            called++;
        });

        it.beforeAll(function () {
            called2++;
        });

        it.should("call beforeAll", function () {
            assert.equal(called, 1);
            assert.equal(called2, 1);
        });

        it.should("not call beforeAll more than once", function () {
            assert.equal(called, 1);
            assert.equal(called2, 1);
        });
    });

    it.describe("#beforeAll error", function (it) {

        var errorMessage1, errorMessage2 = null;
        it.describe("error suite", function (it) {
            it.beforeAll(function () {
                throw new Error("BeforeAll Error");
            });

            it.should("not call action if beforeAll fails", function () {
                throw new Error("Action called when beforeAll failed");
            });

            var beforeAllAction1 = it.getAction("should not call action if beforeAll fails");
            beforeAllAction1.failed = function (start, end, err) {
                errorMessage1 = err.message;
                return beforeAllAction1.success(start, end);
            };

            it.describe("nested error suite", function (it) {
                it.should("not call action if beforeAll fails in parent", function () {
                    throw new Error("Action called when beforeAll failed in parent");
                });

                var beforeAllAction2 = it.getAction("should not call action if beforeAll fails in parent");
                beforeAllAction2.failed = function (start, end, err) {
                    errorMessage2 = err.message;
                    return beforeAllAction2.success(start, end);
                };
            });
        });

        it.should("use the error message from beforeAll for tests if it fails", function () {
            assert.equal(errorMessage1, "BeforeAll Error");
        });

        it.should("use the error message from beforeAll in parent for tests if it fails", function () {
            assert.equal(errorMessage2, "BeforeAll Error");
        });

    });

    it.describe("#beforeEach", function (it) {

        var called = 0;
        it.beforeEach(function () {
            called++;
        });

        it.should("call beforeEach", function () {
            assert.equal(called, 1);
        });

        it.should("call beforeEach again", function () {
            assert.equal(called, 2);
            called = 0;
        });
    });

    it.describe("#beforeEach multi", function (it) {

        var called = 0, called2 = 0;
        it.beforeEach(function () {
            called++;
        });

        it.beforeEach(function () {
            called2++;
        });

        it.should("call beforeEach", function () {
            assert.equal(called, 1);
            assert.equal(called2, 1);
        });

        it.should("call beforeEach again", function () {
            assert.equal(called, 2);
            assert.equal(called2, 2);
            called = called2 = 0;
        });
    });

    it.describe("#afterEach", function (it) {

        var called = 0;
        it.afterEach(function () {
            called++;
        });

        it.should("call not have called afterEach", function () {
            assert.equal(called, 0);
        });
        it.should("have called afterEach", function () {
            assert.equal(called, 1);
        });

        it.should("call afterEach again", function () {
            assert.equal(called, 2);
        });
    });

    it.describe("#afterEach multi", function (it) {

        var called = 0, called2 = 0;
        it.afterEach(function () {
            called++;
        });

        it.afterEach(function () {
            called2++;
        });

        it.should("call not have called afterEach", function () {
            assert.equal(called, 0);
            assert.equal(called2, 0);
        });

        it.should("have called afterEach", function () {
            assert.equal(called, 1);
            assert.equal(called2, 1);
        });

        it.should("call afterEach again", function () {
            assert.equal(called, 2);
            assert.equal(called2, 2);
        });
    });

    it.describe("#afterAll", function (it) {

        var called = 0;
        it.afterAll(function () {
            called++;
        });

        it.afterAll(function () {
            assert.equal(called, 1);
        });

        it.should("not call afterAll", function () {
            assert.equal(called, 0);
        });
        it.should("still not call afterAll", function () {
            assert.equal(called, 0);
        });

    });

    it.describe("#timeout", function (it) {

        it.describe("#action taking to long", function (it) {

            it.timeout(500);

            it.should("fail", function () {
                return {
                    then: function (cb) {
                        setTimeout(cb, 800);
                    }
                };
            });

            var errbackAction = it.getAction("should fail");
            errbackAction.failed = function (start, end, err) {
                var summary = this.get("summary");
                summary.start = start;
                summary.end = end;
                summary.duration = end - start;
                summary.status = "passed";
                summary.error = err || new Error();
                this.emit("success", this);
                return this.get("summary");
            };

            errbackAction.success = function (start, end, err) {
                var summary = this.get("summary");
                summary.start = start;
                summary.end = end;
                summary.duration = end - start;
                summary.status = "failed";
                summary.error = err || new Error();
                this.emit("error", this);
                return this.get("summary");
            };

        });

        it.describe("#action not taking to long", function (it) {

            it.timeout(500);

            it.should("pass", function () {
                return {
                    then: function (cb) {
                        cb();
                    }
                };
            });
        });

    });

    it.describe("#skip", function (it) {

        it.skip("should skip this test", function () {
            throw new Error("Not Skipped");
        });

    });


    it.describe("#should", function (it) {

        it.describe("provided a callback with an arity 0 of zero", function (it) {

            it.should("callback immediatly", function () {
            });
            it.should("be called", function () {
                //just to ensure it was called
                assert.isTrue(true);
            });
        });

        it.describe("provided a callback that returns a promise", function (it) {

            it.should("callback when the promise is resolved", function () {
                var ret = {
                    then: function (cb) {
                        setTimeout(function () {
                            cb();
                        }, 100);
                    }
                };
                return ret;
            });

            it.should("increment call", function () {
                assert.equal(it.getAction("should callback when the promise is resolved").get("summary").status, "passed");
            });

            it.should("callback when the promise is errored", function () {
                return {
                    then: function (cb, eb) {
                        setTimeout(function () {
                            eb("error");
                        }, 100);
                    }
                };
            });

            var errbackAction = it.getAction("should callback when the promise is errored"), errbackCalled = false;
            errbackAction.failed = function (start, end, err) {
                var summary = this.get("summary");
                summary.start = start;
                summary.end = end;
                summary.duration = end - start;
                summary.status = "passed";
                summary.error = err || new Error();
                this.emit("success", this);
                errbackCalled = true;
                return this.get("summary");
            };

            it.should("increment call printError", function () {
                assert.isTrue(errbackCalled);
            });
        });
    });

    it.should("have a summary", function () {
        var summary = it.get("summary");
        assert.isObject(summary);
        var str = [];
        var expected = [
            [
                "should not be null",
                {
                    "status": "passed"
                }
            ],
            [
                "should describe",
                {
                    "status": "passed"
                }
            ],
            [
                "should have methods",
                {
                    "status": "passed"
                }
            ],
            [
                "actions through it as a function",
                [
                    "should support actions through the it function",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "assert extensions",
                [
                    "should add methods",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should test properly",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "#beforeAll",
                [
                    "should call beforeAll",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should call not call beforeAll more than once",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "#beforeAll multi",
                [
                    "should call beforeAll",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should not call beforeAll more than once",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "#beforeAll error",
                [
                    "error suite",
                    [
                        "should not call action if beforeAll fails",
                        {
                            "status": "passed"
                        }
                    ],
                    [
                        "nested error suite",
                        [
                            "should not call action if beforeAll fails in parent",
                            {
                                "status": "passed"
                            }
                        ]
                    ]
                ],
                [
                    "should use the error message from beforeAll for tests if it fails",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should use the error message from beforeAll in parent for tests if it fails",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "#beforeEach",
                [
                    "should call beforeEach",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should call beforeEach again",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "#beforeEach multi",
                [
                    "should call beforeEach",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should call beforeEach again",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "#afterEach",
                [
                    "should call not have called afterEach",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should have called afterEach",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should call afterEach again",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "#afterEach multi",
                [
                    "should call not have called afterEach",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should have called afterEach",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should call afterEach again",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "#afterAll",
                [
                    "should not call afterAll",
                    {
                        "status": "passed"
                    }
                ],
                [
                    "should still not call afterAll",
                    {
                        "status": "passed"
                    }
                ]
            ],
            [
                "#timeout",
                [
                    "#action taking to long",
                    [
                        "should fail",
                        {
                            "status": "passed"
                        }
                    ]
                ],
                [
                    "#action not taking to long",
                    [
                        "should pass",
                        {
                            "status": "passed"
                        }
                    ]
                ]
            ],
            [
                "#skip",
                [
                    "should skip this test",
                    {
                        "status": "skipped"
                    }
                ]
            ],
            [
                "#should",
                [
                    "provided a callback with an arity 0 of zero",
                    [
                        "should callback immediatly",
                        {
                            "status": "passed"
                        }
                    ],
                    [
                        "should be called",
                        {
                            "status": "passed"
                        }
                    ]
                ],
                [
                    "provided a callback that returns a promise",
                    [
                        "should callback when the promise is resolved",
                        {
                            "status": "passed"
                        }
                    ],
                    [
                        "should increment call",
                        {
                            "status": "passed"
                        }
                    ],
                    [
                        "should callback when the promise is errored",
                        {
                            "status": "passed"
                        }
                    ],
                    [
                        "should increment call printError",
                        {
                            "status": "passed"
                        }
                    ]
                ]
            ],
            [
                "should have a summary",
                {
                    "status": "pending"
                }
            ]
        ];
        (function gather(str, a) {
            var summaries = a.summaries;
            for (var k in summaries) {
                if (summaries[k].summaries) {
                    var newStrs = [k];
                    gather(newStrs, summaries[k]);
                    str.push(newStrs);
                } else {
                    var sum = summaries[k];
                    str.push([k, {status: sum.status}]);
                }
            }
        }(str, summary));
        testUtil.jsonDeepEqual(str, expected);
        assert.isNumber(summary.duration);
    });


}).as(module);
