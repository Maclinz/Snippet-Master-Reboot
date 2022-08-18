"use strict";
var _ = require("../../extended"),
    isFunction = _.isFunction,
    EventEmitter = require("./emitter"),
    merge = _.merge,
    Promise = _.Promise,
    utils = require("../../utils"),
    setUpCb = utils.setUpCb;

EventEmitter.extend({

    instance: {

        level: 0,

        constructor: function (description, parent, level, action, status) {
            this._super(arguments);
            this.level = level;
            this.description = description;
            this.parent = parent;
            this.timeout = parent.__timeout;
            this.fn = action;
            this.__summary = {
                parentFullName: parent.get("fullName"),
                description: description,
                start: null,
                end: null,
                duration: 0, // test is pending
                status: status || 'pending',
                error: false
            };
            var stub = this.stub = !isFunction(action);
            this.action = !stub ? setUpCb(action, this.timeout) : _.resolve(this.__summary);
        },

        success: function (start, end) {
            merge(this.get("summary"), { start: start, end: end, duration: end - start, status: "passed"});
            this.emit("success", this);
            return this.get("summary");
        },

        failed: function (start, end, err) {
            merge(this.get("summary"), { start: start, end: end, duration: end - start, status: "failed", error: err || new Error()});
            this.error = err;
            this.emit("error", this);
            return this.get("summary");
        },

        skipped: function (start) {
            merge(this.get("summary"), { start: start, end: start, duration: 0, status: "skipped"});
            this.emit("skipped", this);
            return this.get("summary");
        },

        run: function (be, ae) {
            if (this.__summary.status === "skipped") {
                this.emit("skipped", this);
                return new Promise().callback();
            }
            var start = new Date(),
                failure;
            return _.serial(be)
                .then(_.bind(this, function () {
                    var ret;
                    if (this.stub) {
                        // this test is pending (read: not defined yet)
                        ret = this.action;
                        this.emit(this.__summary.status, this);
                    } else {
                        ret = this.action(this.parent);
                    }
                    return ret;
                })).then(
                    _.bind(this, function () {
                        return _.serial(ae);
                    }),
                    _.bind(this, function (err) {
                        failure = failure || err;
                        return _.serial(ae);
                    })
                ).then(
                    _.bind(this, function () {
                        if (failure) {
                            return this.failed(start, new Date(), failure);
                        }
                        return this.success(start, new Date());
                    }),
                    _.bind(this, function (err) {
                        return this.failed(start, new Date(), failure || err);
                    })
                );
        },

        getters: {

            status: function () {
                return this.__summary.status;
            },

            summary: function () {
                return this.__summary;
            },

            fullName: function () {
                var decription = "";
                if (this.parent) {
                    decription += this.parent.get("fullName") + ":";
                }
                decription += " " + this.description;
                return decription;
            }

        }
    }

}).as(module);