import "reflect-metadata";
import "@testing-library/jest-dom";

// Import translation files
import "@core/ui/frameworks/i18next/i18next.config";

// eslint-disable-next-line jest/no-mocks-import
import server from "./__mocks__/server";

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});

// Prevent Jest to log implementation details console methods
global.console = {
  ...global.console,
  debug: jest.fn(),
};

global.localStorage = {
  ...global.localStorage,
  getItem: jest.fn(),
  setItem: jest.fn(),
};
