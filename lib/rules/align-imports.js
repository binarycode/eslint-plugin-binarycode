'use strict';

var utils = require('../utils')

module.exports = {
  create: function (context) {
    var sourceCode = context.getSourceCode()

    function getFromToken (node) {
      var token = sourceCode.getTokenAfter(node.specifiers[node.specifiers.length - 1])
      while (token.type !== 'Identifier' || token.value !== 'from') {
        token = sourceCode.getTokenAfter(token)
      }

      return token
    }

    function isSuitableImport (node) {
      return node.type === 'ImportDeclaration' && node.specifiers.length >= 1 && node.loc.start.line === node.loc.end.line
    }

    return {
      ImportDeclaration: function (node) {
        if (!isSuitableImport(node)) {
          return
        }

        var siblings = node.parent.body
        var index    = siblings.indexOf(node)
        var imports  = [node]

        for (var i = index - 1; i >= 0 && isSuitableImport(siblings[i]) && utils.noEmptyLineBetween(siblings[i], siblings[i + 1]); --i) {
          imports.unshift(siblings[i])
        }
        for (var i = index + 1; i < siblings.length && isSuitableImport(siblings[i]) && utils.noEmptyLineBetween(siblings[i], siblings[i - 1]); ++i) {
          imports.push(siblings[i])
        }

        var column     = getFromToken(node).loc.start.column
        var fromTokens = imports.map(function (node) {
          return getFromToken(node) }
        )
        var maxColumn = fromTokens.reduce(function (max, token) {
          return Math.max(max, token.loc.start.column)
        }, 0)
        var minMaxColumn = fromTokens.reduce(function (max, token) {
          return Math.max(max, sourceCode.getTokenBefore(token).loc.end.column + 1)
        }, 0)

        if (column !== maxColumn) {
          context.report({
            message: 'Import declarations should align on "from" keyword',
            node:    node
          })
        } else if (minMaxColumn !== maxColumn) {
          context.report({
            message: 'Import declarations should not have extra spaces before aligned "from" keywords',
            node:    node
          })
        }
      }
    }
  }
}
