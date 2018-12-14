<template>
  <ol v-if="state">
    <li v-for="hit in state.hits" :key="hit.objectID">
      <slot name="item" :item="hit"> </slot>
    </li>
    <li class="sentinel" v-observe-visibility="visibilityChanged" />
  </ol>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch';
import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
export default {
  mixins: [createWidgetMixin({ connector: connectInfiniteHits })],
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible && !this.state.isLastPage) {
        this.state.showMore();
      }
    },
  },
};
</script>

<style scoped>
.sentinel {
  list-style-type: none;
}
</style>
