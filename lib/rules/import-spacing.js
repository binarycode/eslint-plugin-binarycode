'use strict';

module.exports = {
  create: function (context) {
    var sourceCode = context.getSourceCode()

    return {
      ImportDeclaration: function (node) {
        var tokens = sourceCode.getTokens(node)

        for (var i = 1; i < tokens.length; i++) {
          if ((tokens[i - 1].end + 1) !== tokens[i].start && tokens[i].value !== 'from') {
            context.report({
              message: 'Import declarations should not have multiple spaces',
              node:    node
            })

            return
          }
        }
      }
    }
  }
}
