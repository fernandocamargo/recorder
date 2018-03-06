export default ({ stopRecording }) => recorder =>
  stopRecording() || recorder.stop();
