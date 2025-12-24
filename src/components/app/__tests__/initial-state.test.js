import initialState from '../initial-state';

describe('App Initial State', () => {
  it('should return initial state object', () => {
    const state = initialState();

    expect(state).toBeDefined();
    expect(typeof state).toBe('object');
  });

  it('should have empty property set to true', () => {
    const state = initialState();
    expect(state.empty).toBe(true);
  });

  it('should have recording set to false', () => {
    const state = initialState();
    expect(state.recording).toBe(false);
  });

  it('should have playing set to false', () => {
    const state = initialState();
    expect(state.playing).toBe(false);
  });

  it('should have current set to null', () => {
    const state = initialState();
    expect(state.current).toBe(null);
  });

  it('should have records as empty object', () => {
    const state = initialState();
    expect(state.records).toEqual({});
  });

  it('should have progress set to 0', () => {
    const state = initialState();
    expect(state.progress).toBe(0);
  });

  it('should have timer set to null', () => {
    const state = initialState();
    expect(state.timer).toBe(null);
  });

  it('should return a new object each time', () => {
    const state1 = initialState();
    const state2 = initialState();

    expect(state1).not.toBe(state2);
    expect(state1).toEqual(state2);
  });

  it('should have all required properties', () => {
    const state = initialState();
    const requiredProps = ['empty', 'recording', 'playing', 'current', 'records', 'progress', 'timer'];

    requiredProps.forEach(prop => {
      expect(state).toHaveProperty(prop);
    });
  });
});
