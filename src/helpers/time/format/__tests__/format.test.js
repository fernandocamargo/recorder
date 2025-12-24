import format from '../index';

describe('time/format', () => {
  it('should format 0 seconds as 00:00', () => {
    expect(format(0)).toBe('00:00');
  });

  it('should format single digit seconds', () => {
    expect(format(5)).toBe('00:05');
  });

  it('should format double digit seconds', () => {
    expect(format(59)).toBe('00:59');
  });

  it('should format minutes', () => {
    expect(format(60)).toBe('01:00');
  });

  it('should format minutes and seconds', () => {
    expect(format(65)).toBe('01:05');
    expect(format(125)).toBe('02:05');
  });

  it('should format double digit minutes', () => {
    expect(format(600)).toBe('10:00');
    expect(format(659)).toBe('10:59');
  });

  it('should handle decimal seconds', () => {
    expect(format(1.5)).toBe('00:01');
    expect(format(65.8)).toBe('01:05');
  });

  it('should format large values', () => {
    expect(format(3599)).toBe('59:59');
    expect(format(3661)).toBe('61:01');
  });
});
