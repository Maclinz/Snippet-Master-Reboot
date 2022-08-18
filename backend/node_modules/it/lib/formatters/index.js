"use strict";
require("./dot");
require("./spec");
require("./tap");
require("./doc");

var Reporter = require("./reporter");

var reporter;
exports.reporter = function getReporter(type) {
    if (type) {
        reporter = Reporter.getInstance(type);
        return reporter;
    } else {
        return reporter;
    }
};


