export default ({ currentTime }) => ({
  sync: node => node && Object.assign(node, { currentTime }),
});
