beforeEach(() => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Mock XHR to prevent live calls
    window.XMLHttpRequest = jest.fn(() => ({ open: jest.fn(), send: jest.fn() }));
    // mock APIs not in jsdom
    window.getSelection = jest.fn(() => ({
      addRange: jest.fn(),
      removeAllRanges: jest.fn()
    }));
    window.open = jest.fn();
    window.scrollTo = jest.fn();
    document.createRange = jest.fn(() => ({
      selectNodeContents: jest.fn()
    }));
    document.queryCommandSupported = () => true;
    // jsdom throws parsing errors for some CSS injected by react-native-web
    // jsdom does not do rendering anyway so stub this out
    window.CSSStyleSheet.prototype.insertRule = jest.fn();
  }

  // workaround jest bug: reset timer mocks
  jest.useFakeTimers();
  expect.hasAssertions();
});

afterEach(() => {
  jest.clearAllTimers();
});

process.on('unhandledRejection', unhandledPromiseRejection => {
  throw new Error(unhandledPromiseRejection);
});
