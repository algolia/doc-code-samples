export default {
  props: {
    queryId: {
      type: String,
      required: true,
    },
  },
  watch: {
    queryId(oldVal, newVal) {
      window.aa('initSearch', {
        getQueryID: () => newVal,
      });
    },
  },
  render() {
    return null;
  },
};
