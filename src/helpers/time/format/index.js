import parse from 'helpers/time/parse';

export default seconds =>
  [600, 60, 10, 1]
    .reduce(parse, { seconds, label: '' })
    .label.replace(/(.)(?=(.{2})+$)/g, '$1:');
