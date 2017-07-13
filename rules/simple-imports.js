'use strict';

module.exports = {
  create: function (context) {
    return {
      ImportDeclaration: function (node) {
        if (node.loc.start.line !== node.loc.end.line) {
          context.report({
            message: 'Multiline imports are disabled',
            node
          })
        }

        if (node.specifiers.length > 1) {
          context.report({
            message: 'Only one import per line is allowed',
            node
          })
        }
      }
    }
  }
}
