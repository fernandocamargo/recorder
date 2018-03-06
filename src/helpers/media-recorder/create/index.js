export default ({ stream, ondataavailable }) =>
  Object.assign(new MediaRecorder(stream), {
    ondataavailable,
  });
