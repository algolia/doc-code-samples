<template>
  <ais-instant-search-ssr>
    <ais-index
      index-name="instant_search_demo_query_suggestions"
      index-id="querySuggestions"
    >
      <ais-search-box />
      <ais-configure :hits-per-page.camel="5" />
      <ais-hits>
        <template #item="{ item }">
          <ais-highlight attribute="query" :hit="item" />
        </template>
      </ais-hits>
      <ais-pagination />
    </ais-index>
    <ais-search-box />
    <ais-stats />
    <ais-index index-id="refinement" index-name="instant_search">
      <ais-refinement-list attribute="brand" />
    </ais-index>
    <ais-hits>
      <template #item="{ item }">
        <p>
          <ais-highlight attribute="name" :hit="item" />
        </p>
        <p>
          <ais-highlight attribute="brand" :hit="item" />
        </p>
      </template>
    </ais-hits>
    <ais-pagination />
  </ais-instant-search-ssr>
</template>

<script setup>
import {
  AisInstantSearchSsr,
  AisIndex,
  AisConfigure,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
} from 'vue-instantsearch/vue3/es';
</script>
