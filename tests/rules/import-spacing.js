'use strict';

require('../index').test('import-spacing')({
  valid: [
    {
      code: 'import foo from "bar"'
    },
    {
      code: 'import foo  from "bar"'
    }
  ],
  invalid: [
    {
      code:   'import  foo from "bar"',
      errors: ['Import declarations should not have multiple spaces']
    },
    {
      code:   'import foo from  "bar"',
      errors: ['Import declarations should not have multiple spaces']
    }
  ]
})
