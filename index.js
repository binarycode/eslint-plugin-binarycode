module.exports = {
  rules: {
    'simple-imports': require('./rules/simple-imports'),
  },
  configs: {
    recommended: {
      rules: {
        'binarycode/simple-imports': 'error'
      }
    }
  }
}
