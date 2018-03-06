import format from 'helpers/time/format';

export default props => {
  const { empty, recording, playing, records, current, progress } = props;
  const { duration } = records[current] || {};

  switch (true) {
    case playing || !!progress:
      return format(progress);
    case recording || (!empty && !playing):
      return format(duration);
    default:
      return false;
  }
};
