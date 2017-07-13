'use strict';

require('../index').test('grouped-imports')({
  valid: [
    {
      code: 'import "huh"\n' +
            '\n' +
            'import foo from "bar"\n' +
            'import lol from "wut"\n' +
            '\n' +
            'import { a } from "b"\n' +
            'import { c } from "d"'
    }
  ],
  invalid: [
    {
      code:   'import "huh"\n' +
              'import foo from "bar"',
      errors: ['Import declarations should be grouped by specifier type']
    },
    {
      code:   'import "huh"\n' +
              'import { a } from "b"',
      errors: ['Import declarations should be grouped by specifier type']
    },
    {
      code:   'import foo from "bar"\n' +
              'import { a } from "b"',
      errors: ['Import declarations should be grouped by specifier type']
    }
  ]
})
