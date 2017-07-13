'use strict';

module.exports = {
  rules: {
    'align-imports':   require('./lib/rules/align-imports'),
    'grouped-imports': require('./lib/rules/grouped-imports'),
    'import-spacing':  require('./lib/rules/import-spacing'),
    'simple-imports':  require('./lib/rules/simple-imports'),
    'sort-imports':    require('./lib/rules/sort-imports')
  },
  configs: {
    recommended: {
      rules: {
        'binarycode/align-imports':   'error',
        'binarycode/grouped-imports': 'error',
        'binarycode/import-spacing':  'error',
        'binarycode/simple-imports':  'error',
        'binarycode/sort-imports':    'error'
      }
    }
  }
}
