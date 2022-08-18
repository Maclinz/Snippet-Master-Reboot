"use strict";

var Test = require("./common").Test,
    bdd = require("./bdd"),
    tdd = require("./tdd");

module.exports = {

    Test: Test,
    bdd: bdd,
    tdd: tdd,

    reporter: function reporter(r) {
        Test.reporter = r;
        bdd.reporter(r);
        tdd.reporter(r);
    },

    printSummary: function printSummary() {
        return Test.printSummary();
    },

    run: function run(filter) {
        return Test.run(filter);
    }
};