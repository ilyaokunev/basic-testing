// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const INVALID_ACTION = 'meow';

function getActionKeyByValue(value: string): string {
  const actionKey = Object.keys(Action).find(key => Action[key as keyof typeof Action] === value);
  return actionKey || 'Invalid';
}

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 5, action: Action.Subtract, expected: 0 },

  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 15, b: 5, action: Action.Divide, expected: 3 },
  { a: -15, b: 5, action: Action.Divide, expected: -3 },
  { a: 5, b: 10, action: Action.Divide, expected: 0.5 },

  {a: 15,b: 5, action: Action.Multiply, expected: 75}, 
  {a: 0.5,b: 2, action: Action.Multiply, expected: 1}, 
  {a:-2,b: 2, action: Action.Multiply, expected: -4}, 
  {a:2,b: 2, action: Action.Multiply, expected: 4}, 

  {a:2,b: 4, action: Action.Exponentiate, expected: 16}, 
  {a:16,b: 0.5, action: Action.Exponentiate, expected: 4}, 

  {a: 2,b: 4, action: INVALID_ACTION, expected: null},
  {a: 'text',b: true, action: Action.Add, expected: null},
]

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(`should return ${expected} when executes ${getActionKeyByValue(action)} action with ${a} and ${b} as args`, () => expect(simpleCalculator({ a, b, action })).toBe(expected));
});