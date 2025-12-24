import increase from '../index';

describe('number/increase', () => {
  it('should increment by 1 when no argument provided', () => {
    const increment = increase();
    expect(increment(0)).toBe(1);
    expect(increment(5)).toBe(6);
    expect(increment(99)).toBe(100);
  });

  it('should increment by specified amount', () => {
    const incrementBy5 = increase(5);
    expect(incrementBy5(0)).toBe(5);
    expect(incrementBy5(10)).toBe(15);
  });

  it('should increment by decimal amounts', () => {
    const incrementBy0_1 = increase(0.1);
    expect(incrementBy0_1(0)).toBeCloseTo(0.1, 1);
    expect(incrementBy0_1(1)).toBeCloseTo(1.1, 1);
    expect(incrementBy0_1(2.5)).toBeCloseTo(2.6, 1);
  });

  it('should handle negative increments', () => {
    const decrement = increase(-1);
    expect(decrement(5)).toBe(4);
    expect(decrement(0)).toBe(-1);
  });

  it('should work with negative numbers', () => {
    const increment = increase(1);
    expect(increment(-5)).toBe(-4);
    expect(increment(-1)).toBe(0);
  });

  it('should return a function', () => {
    const increment = increase();
    expect(typeof increment).toBe('function');
  });
});
