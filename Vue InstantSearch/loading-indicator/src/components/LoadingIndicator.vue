<template>
  <div v-if="state && state.searchMetadata.isSearchStalled">
    <slot> <p>Loading…</p> </slot>
  </div>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch';

const connectSearchMetaData = (
  renderFn,
  unmountFn
) => (/* widget has no parameters */) => ({
  init() {
    renderFn({ searchMetadata: {} }, true);
  },

  render({ searchMetadata }) {
    renderFn({ searchMetadata }, false);
  },

  dispose() {
    unmountFn();
  },
});

export default {
  name: 'AisStateResults',
  mixins: [createWidgetMixin({ connector: connectSearchMetaData })],
};
</script>
