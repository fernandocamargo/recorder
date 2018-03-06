export default {
  componentWillUnmount() {
    const { props: { setTimer, timer } } = this;

    setTimer(window.clearInterval(timer));
  },
};
