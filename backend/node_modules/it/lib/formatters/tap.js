"use strict";
var _ = require("../extended"),
    format = _.format,
    Reporter = require("./reporter");


function getActionName(action) {
    return action.get("fullName").replace(/#/g, '');
}

Reporter.extend({
    instance: {
        ran: 0,

        startTests: function (tests) {
            console.log(format('%d..%d', 1, (tests.numActions)));
        },

        actionSuccess: function printSuccess(action) {
            console.log(format('ok %d %s', ++this.ran, getActionName(action)));
        },

        actionSkipped: function printSkipped(action) {
            console.log(format('ok %d %s # SKIP -', ++this.ran, getActionName(action)));
        },

        actionError: function printError(action) {
            var summary = action.get("summary"), err = summary.error;
            console.log(format('not ok %d %s', ++this.ran, getActionName(action)));
            _((_.isArray(err) ? err : [err])).forEach(function (err) {
                if (err) {
                    if (err.stack) {
                        console.log(err.stack.replace(/^/gm, '  '));
                    } else if (err.message) {
                        console.log(err.message);
                    } else {
                        console.log(err);
                    }
                }
            });
        },

        printFinalSummary: function (test) {
            var summary = this.processSummary(test.summary);
            console.log('# total ' + this.numActions);
            console.log('# passed ' + summary.successCount);
            console.log('# failed ' + summary.errCount);
            console.log('# skipped ' + summary.skippedCount);
            console.log('# pending ' + summary.pendingCount);
            this._static.list(this.errors);
            this._static.listPending(summary.pendingActions);
            return this.returnCode(summary);
        }
    }
}).as(module).registerType("tap");








