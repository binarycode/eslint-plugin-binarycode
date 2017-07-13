'use strict';

var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({
  parserOptions: { sourceType:  "module" }
})

module.exports = {
  test: function(ruleName) {
    var rule = require('../rules/' + ruleName)

    return function(cases) {
      ruleTester.run(ruleName, rule, cases)
    }
  }
}

require('./rules/simple-imports.js')
require('./rules/sort-imports.js')
