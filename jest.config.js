module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],
  moduleNameMapper: {
    '^@agile-learning-institute/mentorhub-ts-api-utils$': '<rootDir>/node_modules/@agile-learning-institute/mentorhub-ts-api-utils/dist/index.js',
  },
  moduleDirectories: ['node_modules', 'src'],
};