'use strict';

var jade_env = require('../index');

// To know the usage of `assert`, see: http://nodejs.org/api/assert.html
var assert = require('assert');

describe("description", function(){
  it("should has attr", function(){
    assert(true, 'attr' in jade_env)
  });
});