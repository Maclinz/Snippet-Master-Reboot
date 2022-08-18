"use strict";
var _ = require("./extended"),
    isPromiseLike = _.isPromiseLike,
    isDefined = _.isDefined,
    isString = _.isString,
    Promise = _.Promise,
    immediate;

if (typeof setImmediate !== "undefined") {
    immediate = setImmediate;
} else {
    immediate = function (cb) {
        setTimeout(cb, 0);
    };
}

function splitFilter(filter) {
    var ret = [];
    if (isString(filter)) {
        ret = _(filter.split("|")).map(function (filter) {
            return _(filter.replace(/^\s*|\s$/g, "").split(":")).map(function (f) {
                return f.replace(/^\s*|\s$/g, "");
            }).value();
        }).value();
    }
    return ret;
}

exports.splitFilter = splitFilter;


function setUpCb(cb, timeout) {
    return function (it) {
        var ret = new Promise(),
            funcRet = new Promise(),
            isCallback = false,
            oldErrorHandler;

        var ignoreProcessError = it.ignoreErrors() === true;
        var errorHandler = function (err) {
            if (!isCallback) {
                isCallback = true;
                ret.errback(err);
            }
        };
        if (ignoreProcessError === false) {
            if (typeof window !== "undefined") {
                //handle uncaught errors in browser
                oldErrorHandler = window.onerror;
                window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
                    errorHandler(errorMsg);
                    return false;
                };

            } else {
                process.on("uncaughtException", errorHandler);
            }
        }
        try {
            var classicNext = function (err) {
                if (!isCallback) {
                    if (err) {
                        ret.errback(err);
                    } else {
                        ret.callback();
                    }
                    isCallback = true;
                }
            };
            var l = cb.length;
            var response = _.bind(funcRet, cb)(classicNext, funcRet);
            if (_.isNumber(timeout)) {
                setTimeout(function () {
                    if (!isCallback) {
                        isCallback = true;
                        ret.errback(new Error("Timeout exceeded"));
                    }
                }, timeout);
            }
            if (isPromiseLike(response)) {
                response.then(funcRet.callback, funcRet.errback);
            } else if (isDefined(response) || l === 0) {
                if (!isCallback) {
                    immediate(function () {
                        ret.callback();
                    });
                    isCallback = true;
                }
            }
            funcRet.then(function () {
                if (!isCallback) {
                    ret.callback();
                    isCallback = true;
                }
            }, function (err) {
                if (!isCallback) {
                    ret.errback(err);
                    isCallback = true;
                }
            });

        } catch (err) {
            if (!isCallback) {
                ret.errback(err);
                isCallback = true;
            }
        }
        ret.both(function () {
            if (ignoreProcessError === false) {
                if (typeof window !== "undefined") {
                    //handle uncaught errors in browser
                    window.onerror = oldErrorHandler;

                } else {
                    process.removeListener("uncaughtException", errorHandler);
                }
            }
        });
        return ret;
    };
}

exports.setUpCb = setUpCb;