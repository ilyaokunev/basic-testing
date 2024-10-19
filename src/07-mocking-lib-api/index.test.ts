import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

const URL = { baseURL: 'https://jsonplaceholder.typicode.com' };

jest.useFakeTimers();
jest.mock('axios', () => ({ create: jest.fn() }));

beforeEach(() => {
  const content = { get: jest.fn(() => Promise.resolve({ data: '' })) };
  const mockedCreate = axios.create as jest.Mock;
  mockedCreate.mockReturnValue(content);
});

afterEach(() => jest.clearAllMocks());

afterAll(() => jest.useRealTimers);

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('');
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.create).toHaveBeenCalledWith(URL);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('');
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.create().get).toHaveBeenCalledWith('');
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi('');
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(result).toEqual('');
  });
});
