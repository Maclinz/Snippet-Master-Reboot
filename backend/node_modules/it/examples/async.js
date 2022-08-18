var it = require("../index"),
    p = require("promise-extended"),
    assert = require("assert");

var Person = function (name, age) {
    this.name = name;
    this.age = age;

    this.getOlder = function (years, cb) {
        if (years > 0) {
            setTimeout(function () {
                this.age = this.age + years;
                cb.call(this, null, this);
            }.bind(this), years * 500);
        } else {
            cb.call(this, null, this);
        }
    };
};

//it.reporter = "dotmatrix";
it.describe("Person", function (it) {

    it.should("set name", function () {
        var person = new Person("bob", 1);
        assert.equal(person.name, "bob");
    });

    it.should("set set age", function () {
        var person = new Person("bob", 1);
        assert.equal(person.age, 1);
    });

    it.describe("#getOlder", function (it) {
        //Call with next
        it.should("accept positive numbers", function (next) {
            var person = new Person("bob", 1);
            person.getOlder(2, function (err, person) {
                assert.equal(person.age, 3);
                next();
            });
        });

        //return promise
        it.should("not apply negative numbers", function (next) {
            var ret = new p.Promise();
            var person = new Person("bob", 1);
            person.getOlder(-2, function (err, person) {
                assert.equal(person.age, 1);
                ret.callback();
            });
            return ret;
        });
    });

    it.describe("#getOlder nested", function (it) {
        //Call with next
        it.describe("with positive numbers", function (it) {
            it.should("work", function (next) {
                var person = new Person("bob", 1);
                person.getOlder(2, function (err, person) {
                    assert.equal(person.age, 3);
                    next();
                });
            });
        });

        //return promise
        it.describe("with negative numbers", function (it) {
            it.should("not work", function (next) {
                var ret = new p.Promise();
                var person = new Person("bob", 1);
                person.getOlder(-2, function (err, person) {
                    assert.equal(person.age, 1);
                    ret.callback();
                });
                return ret;
            });
        });
    });
});

it.run();
