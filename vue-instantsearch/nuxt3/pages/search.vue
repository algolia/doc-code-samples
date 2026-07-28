<template>
  <Search />
</template>

<script setup>
import { h, onServerPrefetch, onMounted, provide } from 'vue';
import { createServerRootMixin } from 'vue-instantsearch/vue3/es';
import algoliasearch from 'algoliasearch/lite';
import { renderToString } from '@vue/server-renderer';
import Search from '../components/search.vue';
import { useNuxtApp } from '#app';

const mixin = createServerRootMixin({
  searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
  indexName: 'instant_search',
  initialUiState: {
    instant_search: {
      query: 'iphone',
      page: 3,
    },
    refinement: {
      refinementList: {
        brand: ['Apple'],
      },
    },
    querySuggestions: {
      query: 'k',
      page: 2,
      configure: {
        hitsPerPage: 5,
      },
    },
  },
});

const app = useNuxtApp();

const { instantsearch } = mixin.data();

provide('$_ais_ssrInstantSearchInstance', instantsearch);

onServerPrefetch(async () => {
  console.log('pre the load', this)
  app.ssrContext.payload.algolia = await instantsearch.findResultsState({
    // todo: what is the component? i don't see how to access the instance we currently are in
    component: h(Search),
    // this relies on a patch in createServerRootMixin, as the component would be a child likely
    instantsearch,
    renderToString,
  });
  console.log('past the load', app.ssrContext.payload.algolia)
});

onMounted(async () => {
  console.log('mounting', app.ssrContext.payload.algolia)
  instantsearch.hydrate(app.ssrContext.payload.algolia);
});
</script>

<style>
.ais-Hits-list {
  text-align: left;
}
.ais-Hits-list:empty {
  margin: 0;
}
.ais-InstantSearch {
  margin: 1em;
}
</style>
