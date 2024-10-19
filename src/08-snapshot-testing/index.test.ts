// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = [1, 6];
    const listValue = {
      value: 1,
      next: { value: 6, next: { value: null, next: null } },
    };
    const result = generateLinkedList(values);
    expect(result).toStrictEqual(listValue);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [1, 2, 54, 65];
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
