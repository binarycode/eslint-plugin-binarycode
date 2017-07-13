'use strict';

var utils = require('../utils')

function onSingleLine (node) {
  return node.loc.start.line == node.loc.end.line
}

module.exports = {
  create: function (context) {
    var previousNode = null
    var sourceCode   = context.getSourceCode()

    function getFromToken(node) {
      var specifiers = node.specifiers
      if (specifiers.length < 1) {
        return null
      }
      var token = sourceCode.getTokenAfter(specifiers[specifiers.length - 1])
      while (token.type !== 'Identifier' || token.value !== 'from') {
        token = sourceCode.getTokenAfter(token)
      }

      return token
    }

    return {
      ImportDeclaration: function (currentNode) {
        if (previousNode && utils.noEmptyLineBetween(previousNode, currentNode) && onSingleLine(currentNode)) {
          var currentFromToken  = getFromToken(currentNode)
          var previousFromToken = getFromToken(previousNode)

          if (currentFromToken && previousFromToken && currentFromToken.loc.start.column !== previousFromToken.loc.start.column) {
            context.report({
              message: 'Import declarations should align on "from" keyword',
              node:    currentNode
            })
          }
        }

        previousNode = currentNode
      }
    }
  }
}
