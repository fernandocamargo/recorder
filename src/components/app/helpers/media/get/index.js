export default ({ playing, records, current }) =>
  playing && URL.createObjectURL(new Blob(records[current].chunks));
