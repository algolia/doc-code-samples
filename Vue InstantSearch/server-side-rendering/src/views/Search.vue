<template>
  <ais-instant-search-ssr>
    <ais-search-box />
    <ais-stats />
    <ais-refinement-list attribute="genre" />
    <ais-hits>
      <template
        slot="item"
        slot-scope="{ item }"
      >
        <ais-highlight
          attribute="title"
          :hit="item"
        />
        <p class="year">{{ item.year }}</p>
        <p class="genre">
          <span
            v-for="genre in item.genre"
            :key="genre"
            class="badge"
          >
            {{ genre }}
          </span>
        </p>
      </template>
    </ais-hits>
    <ais-pagination />
  </ais-instant-search-ssr>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
} from 'vue-instantsearch';
import algoliasearch from 'algoliasearch/lite';
const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

export default {
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
  },
  asyncData({ instantsearch }) {
    return instantsearch.findResultsState({
      query: 'hi',
      hitsPerPage: 5,
      disjunctiveFacets: ['genre'],
      disjunctiveFacetsRefinements: { genre: ['Comedy'] },
    });
  },
  data() {
    return {
      searchClient,
    };
  },
};
</script>


