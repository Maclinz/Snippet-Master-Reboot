"use strict";
var _ = require("../extended"),
    Reporter = require("./reporter"),
    characters = _.characters,
    style = _.style,
    format = _.format,
    multiply = _.multiply;


var stdout = process.stdout;

var pluralize = function (count, str) {
    return count !== 1 ? str + "s" : str;
};

Reporter.extend({
    instance: {

        actionSuccess: function printSuccess() {
            stdout.write(style(".", ['green']));
        },

        actionSkipped: function printSkipped() {
            stdout.write(style(".", ['cyan']));
        },

        actionPending: function printPending() {
            stdout.write(style(".", ['red']));
        },

        actionError: function printError() {
            stdout.write(style(characters.ITALIC_X, ['red']));
        }
    }
}).as(module).registerType("dot").registerType("dotmatrix");








