export default ({ seconds, label }, unit, index, units) => {
  const difference = Math.floor(seconds / unit);

  return {
    seconds: seconds - difference * unit,
    label: label + difference,
  };
};
