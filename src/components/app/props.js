import * as Recorder from './helpers/recorder';
import * as Media from './helpers/media';
import * as Counter from './helpers/counter';

export default props => {
  const {
    recording,
    records,
    playing,
    startPlaying,
    pausePlaying,
    increaseProgress,
  } = props;

  return {
    recorded: !!Object.keys(records).length,
    source: Media.get(props),
    counter: Counter.get(props),
    record: () =>
      Recorder.get(props).then(
        recording ? Recorder.stop(props) : Recorder.start(props),
      ),
    play: () => (playing ? pausePlaying() : startPlaying(increaseProgress)),
  };
};
