import update from 'immutability-helper';

import increase from 'helpers/number/increase';

export const startRecording = state => ({
  uuid = new Date().getTime(),
  recorder,
}) =>
  update(state, {
    progress: { $set: 0 },
    recording: { $set: true },
    current: { $set: uuid },
    records: { [uuid]: { $set: { recorder, chunks: [], duration: 0 } } },
  });

export const updateRecording = state => (chunk, uuid = state.current) =>
  update(state, {
    records: {
      [uuid]: {
        chunks: { $push: [chunk] },
        duration: { $apply: increase() },
      },
    },
  });

export const stopRecording = state => () =>
  update(state, {
    empty: { $set: false },
    recording: { $set: false },
  });

export const startPlaying = state => timer =>
  update(state, {
    playing: { $set: true },
    timer: { $set: window.setInterval(timer, 100) },
  });

export const pausePlaying = state => () =>
  update(state, {
    playing: { $set: false },
    timer: { $set: window.clearInterval(state.timer) },
  });

export const stopPlaying = state => () =>
  update(state, {
    playing: { $set: false },
    progress: { $set: 0 },
    timer: { $set: window.clearInterval(state.timer) },
  });

export const increaseProgress = state => () =>
  update(state, {
    progress: { $apply: increase(0.1) },
  });
