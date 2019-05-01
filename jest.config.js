module.exports = {
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/src/__tests__/assetsTransformer.js',
    '/src/__tests__/__mocks__/'
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/assets/img'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__tests__/assetsTransformer.js'
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!jest.config.js',
    '!webpack.config.js',
    '!**/src/App.jsx',
    '!**/coverage/**',
    '!**/tests/**',
    '!**/redux/**',
    '!**/__tests__/**',
    '!**/index.js',
    '!**/dist/**'
  ]
};
