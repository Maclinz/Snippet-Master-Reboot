"use strict";
var _ = require("../extended"),
    style = _.style,
    format = _.format;

_.declare({

    instance: {
        numActions: 0,

        constructor: function () {
            this.errors = [];
            _.bindAll(this, ["startTests", "testError", "_testError", "printFinalSummary", "listenTest", "listenAction", "testRun",
                "testEnd", "testsDone", "actionError", "_actionError", "actionSuccess", "actionPending",  "actionSkipped",
                "printDuplicateActions"]);
            _.bus.on("start", this.startTests);
            _.bus.on("error", this._testError);
            _.bus.on("done", this.testsDone);
            _.bus.on("test", this.listenTest);
            _.bus.on("printDuplicateActions", this.printDuplicateActions);
        },

        listenTest: function listenTest(test) {
            test.on("test", this.listenTest);
            test.on("action", this.listenAction);
            test.on("run", this.testRun);
            test.on("error", this._testError);
            test.on("done", this.testEnd);
        },

        listenAction: function listenAction(action) {
            this.numActions++;
            action.on("error", this._actionError);
            action.on("success", this.actionSuccess);
            action.on("pending", this.actionPending);
            action.on("skipped", this.actionSkipped);
        },

        formatMs: function formatMs(ms) {
            return format("% 6ds", ms / 1000);
        },

        startTests: function () {
        },

        testRun: function printTitle() {
        },

        actionSuccess: function printSuccess() {
        },

        actionPending: function printPending() {
        },

        actionSkipped: function printSkipped() {
        },

        actionError: function actionError() {
        },

        testError: function printError(test) {
        },

        printDuplicateActions: function printDuplicateActions(duplicateActionErrors) {
            this._static.list(duplicateActionErrors);
        },

        _actionError: function printError(action) {
            var error = action.get("summary").error;
            this.errors.push({error: error, test: action});
            return this.actionError.apply(this, arguments);
        },

        _testError: function _testError(test) {
            this.errors.push({error: test.error, test: test});
            return this.testError.apply(this, arguments);
        },

        processSummary: function processSummary(summary) {
            if (summary.hasOwnProperty("summaries")) {
                summary = summary.summaries;
            }
            var errCount = 0, successCount = 0, skippedCount = 0, pendingCount = 0, pendingActions = [], errors = {}, duration = 0;
            _(summary).forEach(function (sum) {
                duration += sum.duration;
            });
            (function total(summary) {
                _(summary).forEach(function (sum, i) {
                    if (sum.hasOwnProperty("summaries")) {
                        total(sum.summaries);
                    } else if (sum.status === "passed") {
                        successCount++;
                    } else if (sum.status === "pending") {
                        pendingCount++;
                        pendingActions.push(sum.parentFullName + ": " + sum.description);
                    } else if (sum.status === "skipped") {
                        skippedCount++;
                    } else {
                        errors[i] = sum.error;
                        errCount++;
                    }
                });
            })(summary);
            return {
                totalCount: this.numActions,
                errCount: errCount,
                successCount: successCount,
                skippedCount: skippedCount,
                pendingCount: pendingCount,
                pendingActions: pendingActions,
                errors: errors,
                duration: duration
            };
        },

        testEnd: function () {

        },

        testsDone: function (tests) {
            this.printFinalSummary(tests);
        },

        returnCode: function returnCode(stats) {
            return this.errors.length || stats.errCount || stats.totalCount !== (stats.successCount + stats.skippedCount) ? 1 : 0;
        },

        printFinalSummary: function (test) {
            this.testEnd.apply(this, arguments);
            console.log("\nSummary");
            var stats = this.processSummary(test.summary || test.get("summary"));
            var totalCount = stats.totalCount,
                errCount = stats.errCount,
                successCount = stats.successCount,
                pendingCount = stats.pendingCount,
                skippedCount = stats.skippedCount,
                duration = stats.duration;
            console.log(format("Finished in %s", this.formatMs(duration)));
            var out = [
                totalCount + " total",
                successCount + " passed",
                errCount + " failed",
                skippedCount + " skipped",
                pendingCount + " pending"
            ];
            var color = 'green';
            if (errCount > 0 || pendingCount > 0) {
                color = 'red';
            } else if (skippedCount > 0) {
                color = 'cyan';
            }
            console.log(style(out.join(", "), color));
            this._static.list(this.errors);
            this._static.listPending(stats.pendingActions);
            return this.returnCode(stats);
        }
    },

    "static": {

        reporters: {},

        registerType: function (type) {
            type = type.toLowerCase();
            if (!this.reporters.hasOwnProperty(type)) {
                this.reporters[type] = this;
            }
            return this;
        },

        getInstance: function (type, args) {
            type = type.toLowerCase();
            if (this.reporters.hasOwnProperty(type)) {
                return new this.reporters[type](args || {});
            } else {
                throw new Error("Invalid Reporter type");
            }
        },

        listPending: function (pendingActions) {
            if (pendingActions.length) {
                console.log("" + pendingActions.length + " pending actions");
                var more = false;
                if (pendingActions.length > 10) {
                    pendingActions = pendingActions.slice(0, 10);
                    more = true;
                }
                pendingActions.forEach(function (name) {
                    console.log(style('\t%s', ["red", "bold"]), name);
                });
                if (more) {
                    console.log(style('\t...', ["red", "bold"]));
                }
            }
        },

        list: function (errors) {
            console.log();
            errors.forEach(function (test, i) {
                // format
                var fmt = '  %s.%d) %s:\n' + style('     %s', "red") + style('\n%s\n', ["red", "bold"]);
                // msg
                var errs = test.error;
                _((_.isArray(errs) ? errs : [errs])).forEach(function (err, j) {
                    if (err) {
                        var message = err.message || '',
                            stack = err.stack || message,
                            index = stack.indexOf(message) + message.length,
                            msg = stack.slice(0, index);

                        // indent stack trace without msg
                        stack = stack.slice(index ? index + 1 : index)
                            .replace(/^/gm, '  ');

                        console.log(fmt, (i + 1), j, test.test.get("fullName"), msg, stack);
                    }
                });
            });
        }
    }

}).as(module);