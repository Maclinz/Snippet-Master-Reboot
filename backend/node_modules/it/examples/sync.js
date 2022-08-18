var it = require("../index"),
    assert = require("assert");


var Person = function (name, age) {
    this.name = name;
    this.age = age;

    this.getOlder = function (years) {
        if (years > 0) {
            this.age = this.age + years;
        }
    };

};

it.describe("Person", function (it) {

    it.should("set set name", function () {
        var person = new Person("bob", 1);
        assert.equal(person.name, "bob");
    });

    it.should("set set age", function () {
        var person = new Person("bob", 1);
        assert.equal(person.age, 1);
    });


    it.describe("#getOlder", function (it) {

        it.should("accept positive numbers", function () {
            var person = new Person("bob", 1);
            person.getOlder(2);
            assert.equal(person.age, 3);
        });

        it.should("not apply negative numbers", function () {
            var person = new Person("bob", 1);
            person.getOlder(-2);
            assert.equal(person.age, 1);
        });
    });

    it.describe("#getOlder nested", function (it) {

        it.describe("with positive numbers", function (it) {
            it.should("work", function () {
                var person = new Person("bob", 1);
                person.getOlder(2);
                assert.equal(person.age, 3);
            });
        });

        it.describe("with negative numbers", function (it) {
            it.should("not work", function () {
                var person = new Person("bob", 1);
                person.getOlder(-2);
                assert.equal(person.age, 1);
            });
        });

    });

    it.describe('describe without any functionality');
    it.should('allow pending tests');
});


it.run();

