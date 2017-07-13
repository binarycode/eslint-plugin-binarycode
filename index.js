module.exports = {
  rules: {
    'simple-imports': require('./rules/simple-imports'),
    'sort-imports':   require('./rules/sort-imports')
  },
  configs: {
    recommended: {
      rules: {
        'binarycode/simple-imports': 'error'
        'binarycode/sort-imports':   'error'
      }
    }
  }
}
