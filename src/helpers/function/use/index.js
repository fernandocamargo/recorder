export default getter => ({
  to: setter => (...params) => setter(getter(...params)),
});
