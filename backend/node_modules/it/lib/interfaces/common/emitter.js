"use strict";
var _ = require("../../extended"),
    EventEmitter = require("events").EventEmitter;

var instance = _.merge({}, EventEmitter.prototype, {
    constructor: function () {
        EventEmitter.call(this);
        return this._super(arguments);
    }
});

_.declare({
    instance: instance
}).as(module);