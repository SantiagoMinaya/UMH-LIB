module.exports = {
  resolve: {
    alias: {
      '@vitest/mocker': false,
      'vitest': false
    },
    fallback: {
      '@vitest/mocker': false,
      'vitest': false
    }
  },
  externals: [
    /@vitest/,
    /vitest/
  ]
};