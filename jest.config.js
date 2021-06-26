module.exports = {
  collectCoverageFrom: ["app/**/*.{js,ts}"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    "^@app(.*)$": "<rootDir>/app$1",
  },
  preset: "ts-jest",
  roots: ["app"],
  testEnvironment: "node",
};
