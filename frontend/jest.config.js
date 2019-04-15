module.exports = {
  setupFiles: ["./test/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testRegex: "__tests__/.*\\.(js|jsx)$",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest"
  },
  transformIgnorePatterns: ["./node_modules/"],
  testResultsProcessor: "jest-bamboo-reporter"
};
