'use strict';

require('../index').test('align-imports')({
  valid: [
    {
      code: 'import foo      from "bar"\n' +
            'import longName from "baz"'
    },
    {
      code: 'import foo from "bar"\n' +
            '\n' +
            'import longName from "baz"'
    }
  ],
  invalid: [
    {
      code:   'import foo from "bar"\n' +
              'import longName from "baz"',
      errors: ['Import declarations should align on "from" keyword']
    },
    {
      code: 'import foo       from "bar"\n' +
            'import longName  from "baz"',
      errors: [
        'Import declarations should not have extra spaces before aligned "from" keywords',
        'Import declarations should not have extra spaces before aligned "from" keywords'
      ]
    }
  ]
})
