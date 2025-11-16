/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts'
  ],

  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/core/domain/$1',
    '^@infra/(.*)$': '<rootDir>/src/core/infra/$1',
    '^@factories/(.*)$': '<rootDir>/src/core/factories/$1',
  }
};