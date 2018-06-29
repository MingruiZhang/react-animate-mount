module.exports = {
  name: 'react-animate-mount',
  resetMocks: true,
	rootDir: './',
	verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  timers: 'fake'
};
