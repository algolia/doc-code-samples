<template>
  <button @click="refresh">refresh</button>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch';

const connectRefresh = (
  renderFn,
  unmountFn
) => (/* this widget has no parameters */) => ({
  init() {
    renderFn({ refresh: () => {} }, true);
  },

  render({ instantSearchInstance }) {
    // console.log(arguments[0])
    const refresh = instantSearchInstance.refresh.bind(instantSearchInstance);
    renderFn({ refresh }, false);
  },

  dispose() {
    unmountFn();
  },
});

export default {
  name: 'AisStateResults',
  mixins: [createWidgetMixin({ connector: connectRefresh })],
  methods: {
    refresh() {
      this.state.refresh();
    },
  },
};
</script>
