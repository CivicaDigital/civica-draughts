module.exports = {
  verbose: false,
  setupTestFrameworkScriptFile: '<rootDir>/test/setup-tests.js',
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '^.*[.](jpg|JPG|gif|GIF|png|PNG|less|LESS|css|CSS)$': 'EmptyModule'
  }
};
