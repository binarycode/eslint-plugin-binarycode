'use strict';

var utils = require('../utils')

function moduleName(node) {
  return node.source.value
}

function specifierName(node) {
  var specifier = node.specifiers[0]
  if (specifier) {
    return specifier.local.name
  }
}

module.exports = {
  create: function (context) {
    var previousNode = null

    return {
      ImportDeclaration: function (currentNode) {
        if (previousNode && utils.noEmptyLineBetween(previousNode, currentNode)) {
          var currentModuleName     = moduleName(currentNode)
          var previousModuleName    = moduleName(previousNode)
          var currentSpecifierName  = specifierName(currentNode)
          var previousSpecifierName = specifierName(previousNode)

          if (currentModuleName < previousModuleName) {
            context.report({
              message: 'Import declarations should be sorted alphabetically by module name',
              node:    currentNode
            })
          } else if ((currentModuleName == previousModuleName) && (currentSpecifierName < previousSpecifierName)) {
            context.report({
              message: 'Import declarations should be sorted alphabetically by specifier name within same module',
              node:    currentNode
            })
          }
        }

        previousNode = currentNode
      }
    }
  }
}
