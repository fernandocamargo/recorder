export default ({ startRecording }) => recorder =>
  startRecording({ recorder }) || recorder.start(1000);
