// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, rejectCustomError } from './index';

const TEST_TEXT = 'test_text';
const DEFAULT_MESSAGE = 'Oops!';
const CUSTOM_ERROR_TEXT = 'This is my awesome custom error!';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(TEST_TEXT);
    expect(result).toBe('test_text');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(TEST_TEXT)).toThrow(TEST_TEXT)
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() =>throwError()).toThrow(DEFAULT_MESSAGE)
  
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(CUSTOM_ERROR_TEXT)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrow(CUSTOM_ERROR_TEXT)
  });
});
