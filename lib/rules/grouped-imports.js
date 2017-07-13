'use strict';

var utils = require('../utils')

function getImportType(node) {
  if (node.specifiers.length === 0) {
    return 'side-effect'
  }

  if (node.specifiers[0].type === 'ImportSpecifier') {
    return 'named'
  }

  if (node.specifiers[0].type === 'ImportDefaultSpecifier') {
    return 'default'
  }

  return null
}

module.exports = {
  create: function (context) {
    var previousNode = null

    return {
      ImportDeclaration: function (currentNode) {
        if (previousNode && utils.noEmptyLineBetween(previousNode, currentNode)) {
          if (getImportType(previousNode) !== getImportType(currentNode)) {
            context.report({
              message: 'Import declarations should be grouped by specifier type',
              node:    currentNode
            })
          }
        }

        previousNode = currentNode
      }
    }
  }
}
