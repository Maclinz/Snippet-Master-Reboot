"use strict";
var _ = require("../../extended"),
    AssertionError = require("assert").AssertionError,
    Reporter = require("../../formatters/reporter"),
    format = _.format,
    arraySlice = Array.prototype.slice;


var pluralize = function (count, str) {
    return count !== 1 ? str + "s" : str;
};

function getSpacing(action) {
    return action.level * 2.5 + "em";
}

function createDom(type, attrs) {
    var el = document.createElement(type);
    _(arraySlice.call(arguments, 2)).forEach(function (child) {
        if (_.isString(child)) {
            el.appendChild(document.createTextNode(child));
        } else if (child) {
            el.appendChild(child);
        }
    });
    _(attrs || {}).forEach(function (attrs, attr) {
        if (attr === "className") {
            el[attr] = attrs;
        } else {
            el.setAttribute(attr, attrs);
        }
    });
    return el;
}

function updateActionStatus(action, status) {
    var els = document.querySelectorAll('[data-it-actionName="' + action.get("fullName") + '"]');
    for (var i = 0, l = els.length; i < l; i++) {
        var el = els.item(i), className = el.className;
        el.className = className.replace(/(not-run|pending|error|passed) */ig, "") + " " + status;
    }
}

Reporter.extend({
    instance: {

        constructor: function (el) {
            this._super(arguments);
            this.el = document.getElementById(el);
            this.header = this.el.appendChild(createDom("div", {className: "header"}, createDom("h1", {}, createDom("a", {href: "?"}, "It"))));
            this.summary = this.header.appendChild(createDom("div", {className: "summary"}));
            this.progress = this.el.appendChild(createDom("ul", {className: "progress"}));
            this.actions = this.el.appendChild(createDom("div", {className: "actions"}));
            this.errors = [];
            if (!this.el) {
                throw new Error("Unable to find el with id #" + el);
            }
        },

        listenAction: function (action) {
            this._super(arguments);
            var actionName = action.get("fullName");
            this.progress.appendChild(createDom("li", {className: "not-run", "data-it-actionName": actionName}));

        },

        testRun: function printTitle(action) {
            if (action.description) {
                this.actions.appendChild(createDom("div",
                    {className: "header", style: "padding-left:" + getSpacing(action), "data-it-actionName": action.get("fullName")},
                    createDom("a", {
                        href: "?filter=" + encodeURIComponent(action.get("fullName"))
                    }, action.description)
                ));
            }
        },

        __addAction: function (action) {
            var summary = action.get("summary");
            this.actions.appendChild(createDom("div",
                {className: "pending", style: "padding-left:" + getSpacing(action), "data-it-actionName": action.get("fullName")},
                createDom("a", {
                    href: "?filter=" + encodeURIComponent(action.get("fullName"))
                }, format(" %s, (%dms)", action.description, summary.duration))
            ));
            updateActionStatus(action, summary.status);
            return this;
        },

        __formatError: function (error) {
            var str = error.stack || error.toString();

            if (error instanceof AssertionError) {
                str = error.toString() + "\n" + (error.stack || "").replace(/AssertionError.*\n/, "");
            }

            if (error.message) {
                // FF / Opera do not add the message
                if (!~str.indexOf(error.message)) {
                    str = error.message + '\n' + str;
                }

                // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we
                // check for the result of the stringifying.
                if ('[object Error]' === str) {
                    str = error.message;
                }
            }

            // Safari doesn't give you a stack. Let's at least provide a source line.
            if (!error.stack && error.sourceURL && error.line !== undefined) {
                str += "\n(" + error.sourceURL + ":" + error.line + ")";
            }
            return str;
        },

        actionSuccess: function (action) {
            this.__addAction(action);
        },

        actionSkipped: function (action) {
            this.__addAction(action);
        },

        actionPending: function (action) {
            this.__addAction(action);
        },

        actionError: function printError(action) {
            this._super(arguments);
            this.__addAction(action);
        },

        printErrors: function () {
            if (this.errors.length) {
                //clear all actions
                this.actions.innerHTML = "";
                _(this.errors).forEach(function (test, i) {
                    var error = test.error, action = test.test;
                    this.actions.appendChild(createDom("pre",
                        {className: "failed"},
                        format('  %s) %s:', i, action.get("fullName")),
                        createDom("br"),
                        this.__formatError(error).replace(/^/gm, '       ')
                    ));
                }, this);
            }
        },

        printFinalSummary: function (test) {
            var summary = test.summary;
            var stats = this.processSummary(summary);
            var errCount = stats.errCount, successCount = stats.successCount, pendingCount = stats.pendingCount, duration = stats.duration;
            var out = [
                "Duration " + this.formatMs(duration),
                successCount + pluralize(successCount, " example"),
                errCount + pluralize(errCount, " error"),
                pendingCount + " pending"
            ];
            this.summary.appendChild(createDom("div",
                {className: pendingCount > 0 ? "pending" : errCount > 0 ? "failed" : "success"},
                out.join(", ")));
            this.printErrors();
            return errCount ? 1 : 0;
        }
    }
}).as(module).registerType("html");