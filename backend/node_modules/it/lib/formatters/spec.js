"use strict";
var _ = require("../extended"),
    Reporter = require("./reporter"),
    characters = _.characters,
    style = _.style,
    multiply = _.multiply;

Reporter.extend({

    instance: {

        testRun: function printTitle(test) {
            this._super(arguments);
            if (test.description) {
                var level = test.level, title = test.description;
                console.log(multiply("\t", level) + title);
            }
        },

        actionSuccess: function (action) {
            var level = action.level, summary = action.get("summary");
            console.log(style(multiply("\t", level) + characters.CHECK + " %s (%dms)", ['green']), action.description, summary.duration);
        },

        actionPending: function (action) {
            var summary = action.get("summary"), level = action.level;
            console.log(style(multiply("\t", level) + characters.ITALIC_X + " %s (%dms)", ['yellow']), action.description, summary.duration);
        },

        actionSkipped: function (action) {
            var summary = action.get("summary"), level = action.level;
            console.log(style(multiply("\t", level) + characters.LAMBDA + " %s (%dms)", ['cyan']), action.description, summary.duration);
        },

        actionError: function printError(action) {
            var level = action.level, summary = action.get("summary");
            console.log(style(multiply("\t", level) + characters.ITALIC_X + " %s, (%dms)", ['red', "bold"]), action.description, summary.duration);
        }
    }

}).as(module).registerType("spec");



