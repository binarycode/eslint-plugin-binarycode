'use strict';

require('../index').test('simple-imports')({
  valid: [
    { code: 'import "module"' },
    { code: 'import foo from "module"' },
    { code: 'import { foo } from "module"' },
    { code: 'import { foo as bar } from "module"' }
  ],
  invalid: [
    {
      code:   'import {\nbar\n} from "module"',
      errors: ['Multiline imports are disabled']
    },
    {
      code:   'import { foo, bar } from "module"',
      errors: ['Only one import per line is allowed']
    },
    {
      code:   'import foo, { bar } from "module"',
      errors: ['Only one import per line is allowed']
    }
  ]
})
