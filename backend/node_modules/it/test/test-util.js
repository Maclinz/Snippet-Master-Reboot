require('colors');
var assert = require('assert'),
    jsdiff = require("diff");

module.exports = {
    jsonDeepEqual: jsonDeepEqual
}

function jsonDeepEqual(val, expected, msg) {
    try {
        assert.deepEqual(val, expected, msg);
    } catch (e) {
        jsdiff.diffJson(val, expected).forEach(function(part){
            // green for additions, red for deletions
            // grey for common parts
            var color = part.added ? 'green' :
                ( part.removed ? 'red' : 'grey');
            process.stderr.write(part.value[color]);
        });
        throw e;
    }
}