export default {
  click: ({ action }) => event => {
    event.preventDefault();
    action();
  },
};
