'use strict';

module.exports = {
  noEmptyLineBetween: function (node1, node2) {
    var loc1 = node1.loc
    var loc2 = node2.loc

    return ((loc1.start.line - loc2.end.line) === 1) || ((loc2.start.line - loc1.end.line) === 1)
  }
}
