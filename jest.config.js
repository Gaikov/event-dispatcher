/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,

  coverageProvider: "v8",

  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json"
    }
  },

  preset: "ts-jest",

  roots: [
     "<rootDir>/src",
     "<rootDir>/test"
  ],

  testEnvironment: "node",
};
