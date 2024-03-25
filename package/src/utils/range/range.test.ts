import { range } from './range';

describe('utils/range', () => {
  it('returns range between given numbers', () => {
    expect(range(1, 5)).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('allows generating stepped range', () => {
    expect(range(1, 10, 3)).toStrictEqual([1, 4, 7, 10]);
  });
});
