// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const INITIAL_BALANCE = 100;

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = new BankAccount(INITIAL_BALANCE);
    jest.unmock('lodash');
  });

  test('should create account with initial balance', () => {
    const acc = getBankAccount(INITIAL_BALANCE);
    expect(acc).toBeInstanceOf(BankAccount);
    expect(acc.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const accountBalance = account.getBalance();
    expect(() => account.withdraw(accountBalance + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountBalance = account.getBalance();
    const anotherAccount = getBankAccount(INITIAL_BALANCE);

    expect(() =>
      account.transfer(accountBalance + 1, anotherAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(1, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const accountBalance = account.getBalance();
    account.deposit(10);
    expect(account.getBalance()).toBe(accountBalance + 10);
  });

  test('should withdraw money', () => {
    const accountBalance = account.getBalance();

    account.withdraw(accountBalance);

    expect(account.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const accountBalance = account.getBalance();
    const anotherAccount = getBankAccount(INITIAL_BALANCE);
    account.transfer(accountBalance, anotherAccount);

    expect(account.getBalance()).toBe(0);
    expect(anotherAccount.getBalance()).toBe(INITIAL_BALANCE * 2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const lodash = jest.requireActual('lodash');

    lodash.random = jest.fn(() => 1);

    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const spy = jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(async () => {
        return new Promise((res) => res(50));
      });

    await account.synchronizeBalance();

    spy.mockRestore();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spy = jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(async () => {
        return new Promise((res) => res(null));
      });

    expect(() => account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );

    spy.mockRestore();
  });
});
