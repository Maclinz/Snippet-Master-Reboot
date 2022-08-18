var assert = require("assert"),
    _ = require("./extended"),
    format = _.format;

assert.lengthOf = function (arr, length, message) {
    if (arr.length !== length) {
        assert.fail(arr.length, length, message || format("expected %s, to have %d elements", [arr, length]), assert.lengthOf);
    }
};

assert.truthy = function (val, message) {
    if (!val) {
        assert.fail(val, true, message || format("expected %s to be truthy", val), assert.truthy);
    }
};

assert.falsy = function (val, message) {
    if (val) {
        assert.fail(val, false, message || format("expected %s to be falsy", val), assert.truthy);
    }
};

assert.isRegExp = function (val, message) {
    if (!_.isRegExp(val)) {
        assert.fail(val, 0, message || format("expected %s, to be a regex", val), assert.isRexExp);
    }
};

_.forEach([
    ["isTrue", "true"],
    ["isFalse", "false"],
    ["isArray", "an array"],
    ["isNull", "null"],
    ["isNotNull", "not null"],
    ["isNumber", "a number"],
    ["isHash", "a hash"],
    ["isObject", "an object"],
    ["isDate", "a date"],
    ["isBoolean", "a boolean"],
    ["isString", "a string"],
    ["isUndefined", "undefined"],
    ["isUndefinedOrNull", "undefined or null"],
    ["isPromiseLike", "a promise"],
    ["isFunction", "a function"],
    ["isEmpty", "empty"]
], function (i) {
    var k = i[0], extra = i[1];
    assert[k] = function (val, message) {
        if (!_[k](val)) {
            assert.fail(val, 0, message || format("expected %s, to be " + extra, val), assert[k]);
        }
    };
});

assert.instanceOf = function (val, cls, message) {
    if (!_.instanceOf(val, cls)) {
        assert.fail(val, cls, message || format("expected %j to be instanceof %s", [val, cls]), "===", assert.isNotNull);
    }
};

module.exports = assert;