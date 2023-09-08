<template>
  <div>
    <ais-refinement-list :attribute-name="attributeName">
      <div slot="header" class="ais-refinement-list--header">{{ headerTitle }}</div>
    </ais-refinement-list>
    <div class="ais-refinement-list" v-if="noResults">
      <div class="ais-refinement-list--header">{{ headerTitle }}</div>
      <div class="ais-refinement-list__item">{{ emptyMessage }}</div>
    </div>
  </div>
</template>

<script>
import { Component } from 'vue-instantsearch'

export default {
  mixins: [Component],
  props: {
    attributeName: String,
    headerTitle: String,
    emptyMessage: {
      type: String,
      default: 'No results.'
    }
  },
  computed: {
    noResults() {
      return !this.searchStore._results.length > 0
    }
  }
};
</script>
