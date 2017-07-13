'use strict';

require('../index').test('sort-imports')({
  valid: [
    {
      code: 'import a from "moduleA"\n' +
            'import b from "moduleA"'
    },
    {
      code: 'import b from "moduleA"\n' +
            'import a from "moduleB"'
    },
    {
      code: 'import b from "moduleA"\n' +
            '\n' +
            'import a from "moduleA"'
    }
  ],
  invalid: [
    {
      code:   'import b from "moduleA"\n' +
              'import a from "moduleA"\n',
      errors: ['Import declarations should be sorted alphabetically by specifier name within same module']
    },
    {
      code:   'import a from "moduleB"\n' +
              'import b from "moduleA"\n',
      errors: ['Import declarations should be sorted alphabetically by module name']
    }
  ]
})
