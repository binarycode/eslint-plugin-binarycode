'use strict';

function nearby(node1, node2) {
  return (node2.loc.start.line - node1.loc.end.line) === 1
}

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
    let previousNode = null


    return {
      ImportDeclaration: function (currentNode) {
        if (previousNode && nearby(previousNode, currentNode)) {
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
