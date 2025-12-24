import * as reducers from '../reducers';

describe('App Reducers', () => {
  describe('startRecording', () => {
    it('should update state when recording starts', () => {
      const initialState = {
        progress: 10,
        recording: false,
        current: null,
        records: {},
      };

      const uuid = 1234567890;
      const recorder = { start: jest.fn() };

      const newState = reducers.startRecording(initialState)({ uuid, recorder });

      expect(newState.progress).toBe(0);
      expect(newState.recording).toBe(true);
      expect(newState.current).toBe(uuid);
      expect(newState.records[uuid]).toEqual({
        recorder,
        chunks: [],
        duration: 0,
      });
    });

    it('should preserve existing records when starting new recording', () => {
      const existingRecorder = { stop: jest.fn() };
      const initialState = {
        progress: 0,
        recording: false,
        current: 111,
        records: {
          111: { recorder: existingRecorder, chunks: [], duration: 5 },
        },
      };

      const uuid = 222;
      const recorder = { start: jest.fn() };

      const newState = reducers.startRecording(initialState)({ uuid, recorder });

      expect(newState.records[111]).toBeDefined();
      expect(newState.records[222]).toBeDefined();
      expect(newState.current).toBe(uuid);
    });
  });

  describe('updateRecording', () => {
    it('should add chunk to current recording', () => {
      const initialState = {
        current: 123,
        records: {
          123: { recorder: {}, chunks: [], duration: 0 },
        },
      };

      const chunk = new Blob(['audio data']);
      const newState = reducers.updateRecording(initialState)(chunk);

      expect(newState.records[123].chunks).toHaveLength(1);
      expect(newState.records[123].chunks[0]).toBe(chunk);
      expect(newState.records[123].duration).toBe(1);
    });

    it('should increment duration when chunk is added', () => {
      const initialState = {
        current: 123,
        records: {
          123: { recorder: {}, chunks: [], duration: 5 },
        },
      };

      const chunk = new Blob(['audio data']);
      const newState = reducers.updateRecording(initialState)(chunk);

      expect(newState.records[123].duration).toBe(6);
    });

    it('should allow specifying custom uuid', () => {
      const initialState = {
        current: 123,
        records: {
          123: { recorder: {}, chunks: [], duration: 0 },
          456: { recorder: {}, chunks: [], duration: 0 },
        },
      };

      const chunk = new Blob(['audio data']);
      const newState = reducers.updateRecording(initialState)(chunk, 456);

      expect(newState.records[456].chunks).toHaveLength(1);
      expect(newState.records[123].chunks).toHaveLength(0);
    });
  });

  describe('stopRecording', () => {
    it('should update state when recording stops', () => {
      const initialState = {
        empty: true,
        recording: true,
      };

      const newState = reducers.stopRecording(initialState)();

      expect(newState.empty).toBe(false);
      expect(newState.recording).toBe(false);
    });
  });

  describe('startPlaying', () => {
    it('should start playing and set timer', () => {
      const initialState = {
        playing: false,
        timer: null,
      };

      const timerFn = jest.fn();
      const newState = reducers.startPlaying(initialState)(timerFn);

      expect(newState.playing).toBe(true);
      expect(newState.timer).toBeDefined();
      expect(typeof newState.timer).toBe('number');
    });
  });

  describe('pausePlaying', () => {
    it('should pause playing and clear timer', () => {
      const timerId = setInterval(() => {}, 1000);
      const initialState = {
        playing: true,
        timer: timerId,
      };

      const newState = reducers.pausePlaying(initialState)();

      expect(newState.playing).toBe(false);
      // Timer is cleared so it should be undefined
      expect(typeof newState.timer).toBe('undefined');
    });
  });

  describe('stopPlaying', () => {
    it('should stop playing, reset progress, and clear timer', () => {
      const timerId = setInterval(() => {}, 1000);
      const initialState = {
        playing: true,
        progress: 5,
        timer: timerId,
      };

      const newState = reducers.stopPlaying(initialState)();

      expect(newState.playing).toBe(false);
      expect(newState.progress).toBe(0);
      // Timer is cleared so it should be undefined
      expect(typeof newState.timer).toBe('undefined');
    });
  });

  describe('increaseProgress', () => {
    it('should increment progress by 0.1', () => {
      const initialState = {
        progress: 0,
      };

      const newState = reducers.increaseProgress(initialState)();

      expect(newState.progress).toBe(0.1);
    });

    it('should increment from existing progress', () => {
      const initialState = {
        progress: 2.5,
      };

      const newState = reducers.increaseProgress(initialState)();

      expect(newState.progress).toBeCloseTo(2.6, 1);
    });
  });
});
