module.exports = {
    moduleFileExtensions: ['js'],
    transform: {
      '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/js/$1'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/test/setup-test.js'],
  };