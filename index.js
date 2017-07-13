'use strict';

module.exports = {
  rules: {
    'align-imports':  require('./lib/rules/align-imports'),
    'simple-imports': require('./lib/rules/simple-imports'),
    'sort-imports':   require('./lib/rules/sort-imports')
  },
  configs: {
    recommended: {
      rules: {
        'binarycode/align-imports':  'error',
        'binarycode/simple-imports': 'error',
        'binarycode/sort-imports':   'error'
      }
    }
  }
}
