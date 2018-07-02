module.exports = {
  name: 'react-animate-mount',
	rootDir: './',
	verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  setupTestFrameworkScriptFile: '<rootDir>/test/enzyme-setup.js',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  timers: 'fake'
};
