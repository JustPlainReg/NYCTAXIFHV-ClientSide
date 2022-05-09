const project = require('./project.config')

module.exports = {
  'collectCoverage': true,
  'coverageDirectory' : 'coverage',
  'verbose': false,
  'clearMocks': true,
  'restoreMocks': true,
  'setupFiles': ['mock-local-storage'],
  'setupTestFrameworkScriptFile': '<rootDir>setupTests.js',
  'globals': {
    'PUBLIC_PATH_GLOBAL': project.globals,
    'window': project.globals
  },
  'moduleNameMapper': {
    '\\.(jpg|jpeg|png|gif|eot|o tf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>__mocks__/fileMock.js',
    '^.+\\.(s?css|less)$': '<rootDir>preprocessor.js'
  },
  'transform': {
    '^.+\\.js$': '<rootDir>node_modules/babel-jest'
  },
  'moduleFileExtensions': ['js']
}
