define([
    "it"
], function (it) {
    "use strict";
    var assert = it.assert;

    it.suite("it tdd", function (it) {

        it.test("should not be null", function () {
            assert.isNotNull(it);
        });

        it.test("should describe", function () {
            assert.equal(it.description, "it tdd");
        });

        it.test("should have methods", function () {
            assert.isFunction(it.beforeAll);
            assert.isFunction(it.beforeEach);
            assert.isFunction(it.afterEach);
            assert.isFunction(it.afterAll);
            assert.isFunction(it.test);
            assert.isFunction(it.suite);
            assert.isFunction(it.context);
        });

        it.suite("assert extensions", function (it) {

            it.test('should add methods', function () {
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

            it.test('should test properly', function () {
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

        it.suite("#beforeAll", function (it) {

            var called = 0;
            it.beforeAll(function () {
                called++;
            });

            it.test("should call beforeAll", function () {
                assert.equal(called, 1);
            });

            it.test("should call not call beforeAll more than once", function () {
                assert.equal(called, 1);
            });
        });

        it.suite("#beforeAll multi", function (it) {

            var called = 0, called2 = 0;
            it.beforeAll(function () {
                called++;
            });

            it.beforeAll(function () {
                called2++;
            });

            it.test("should call beforeAll", function () {
                assert.equal(called, 1);
                assert.equal(called2, 1);
            });
            it.test("should not call beforeAll more than once", function () {
                assert.equal(called, 1);
                assert.equal(called2, 1);
            });
        });

        it.suite("#beforeEach", function (it) {

            var called = 0;
            it.beforeEach(function () {
                called++;
            });

            it.test("should call beforeEach", function () {
                assert.equal(called, 1);
            });
            it.test("should call beforeEach again", function () {
                assert.equal(called, 2);
                called = 0;
            });
        });

        it.suite("#beforeEach multi", function (it) {

            var called = 0, called2 = 0;
            it.beforeEach(function () {
                called++;
            });

            it.beforeEach(function () {
                called2++;
            });

            it.test("should call beforeEach", function () {
                assert.equal(called, 1);
                assert.equal(called2, 1);
            });
            it.test("should call beforeEach again", function () {
                assert.equal(called, 2);
                assert.equal(called2, 2);
                called = called2 = 0;
            });
        });

        it.suite("#afterEach", function (it) {

            var called = 0;
            it.afterEach(function () {
                called++;
            });

            it.test("should call not have called afterEach", function () {
                assert.equal(called, 0);
            });
            it.test("should have called afterEach", function () {
                assert.equal(called, 1);
            });

            it.test("should call afterEach again", function () {
                assert.equal(called, 2);
            });
        });

        it.suite("#afterEach multi", function (it) {

            var called = 0, called2 = 0;
            it.afterEach(function () {
                called++;
            });

            it.afterEach(function () {
                called2++;
            });

            it.test("should call not have called afterEach", function () {
                assert.equal(called, 0);
                assert.equal(called2, 0);
            });
            it.test("should have called afterEach", function () {
                assert.equal(called, 1);
                assert.equal(called2, 1);
            });

            it.test("should call afterEach again", function () {
                assert.equal(called, 2);
                assert.equal(called2, 2);
            });
        });

        it.suite("#afterAll", function (it) {

            var called = 0;
            it.afterAll(function () {
                called++;
            });

            it.afterAll(function () {
                assert.equal(called, 1);
            });

            it.test("should not call afterAll", function () {
                assert.equal(called, 0);
            });
            it.test("should still not call afterAll", function () {
                assert.equal(called, 0);
            });

        });


        it.suite("#should", function (it) {

            it.suite("provided a callback with an arity 0 of zero", function (it) {

                it.test("should callback immediatly", function () {
                });
                it.test("should be called", function () {
                    //just to ensure it was called
                    assert.isTrue(true);
                });
            });

            it.suite("provided a callback that returns a promise", function (it) {

                it.test("should callback when the promise is resolved", function () {
                    var ret = {
                        then: function (cb) {
                            setTimeout(function () {
                                cb();
                            }, 100);
                        }
                    };
                    return ret;
                });

                it.test("should increment call", function () {
                    assert.equal(it.getAction("should callback when the promise is resolved").get("summary").status, "passed");
                });

                it.test("should callback when the promise is errored", function () {
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

                it.test("should increment call printError", function () {
                    assert.isTrue(errbackCalled);
                });
            });
        });

        it.test("should have a summary", function () {
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
            assert.deepEqual(str, expected);
            assert.isNumber(summary.duration);
        });

    });

});