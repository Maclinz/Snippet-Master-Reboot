/**
 *
 * @projectName it
 * @github https://github.com/doug-martin/it
 * @header [../readme.md]
 */

"use strict";
var _ = require("./extended"),
    merge = _.merge,
    formatters = require("./formatters"),
    interfaces = require("./interfaces");

require("./extension");


var it = {

    reporter: function reporter(r) {
        return formatters.reporter(r);
    },

    printSummary: function printSummary() {
        interfaces.printSummary();
    },

    run: function run(filter) {
        if (!formatters.reporter()) {
            formatters.reporter("spec");
        }
        return interfaces.run(filter);
    }

};

_(interfaces).forEach(function (val) {
    it = merge({}, val, it);
});

module.exports = it;