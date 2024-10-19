// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

import path from 'node:path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => {
  const originalModule = jest.requireActual('fs');
  return {
    ...originalModule,
    existsSync: jest.fn(),
  };
});

jest.mock('fs/promises', () => {
  const originalModule = jest.requireActual('fs/promises');
  return {
    ...originalModule,
    readFile: jest.fn(),
  };
});

const mockedExist = existsSync as jest.Mock;
const mockedRead = readFile as jest.Mock;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(() => console.log('meow'), 2000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });

  test('should call callback only after timeout', () => {
    const spy = jest.spyOn(console, 'log');
    doStuffByTimeout(() => console.log('meow'), 2000);
    expect(spy).not.toBeCalled();

    jest.advanceTimersByTime(2000);

    expect(spy).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(() => console.log('meow'), 2000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const spy = jest.spyOn(console, 'log');

    doStuffByInterval(() => console.log('meow'), 200);
    expect(spy).not.toBeCalled();

    jest.advanceTimersByTime(600);

    expect(spy).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');

    const pathToAdd = '../01-simple-tests/index.ts';

    await readFileAsynchronously(pathToAdd);
    expect(spy).toBeCalledWith(expect.any(String), pathToAdd);
  });

  test('should return null if file does not exist', async () => {
    mockedExist.mockReturnValueOnce(null);

    const pathToAdd = '../01-simple-tests/index.ts';

    const result = await readFileAsynchronously(pathToAdd);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    mockedExist.mockReturnValueOnce(true);
    mockedRead.mockResolvedValueOnce('blablabla');
    const pathToAdd = '../01-simple-tests/index.ts';

    const result = await readFileAsynchronously(pathToAdd);
    expect(result).toBe('blablabla');
  });
});
