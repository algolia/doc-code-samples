import algoliasearch from 'algoliasearch/lite';
import {
  autocomplete,
  getAlgoliaHits,
  reverseHighlightItem,
} from '@algolia/autocomplete-js';
import { predefinedItems } from './predefined-items';
import { recentSearches } from './recent-searches';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

autocomplete({
  container: '#autocomplete',
  plugins: [predefinedItems, recentSearches],
  openOnFocus: true,
  onStateChange({ state, prevState }) {
    if (state.query !== prevState.query) {
      console.log('query:', state.query);
    }
  },
  getSources({ query }) {
    return [
      {
        getInputValue: ({ suggestion }) => suggestion.query,
        getSuggestions({ query }) {
          return getAlgoliaHits({
            searchClient,
            queries: [
              {
                indexName: 'instant_search_demo_query_suggestions',
                query,
                params: {
                  hitsPerPage: 4,
                  facetFilters: [...recentSearches.data.getFacetFilters()],
                },
              },
            ],
          }).then((results) => {
            return results[0];
          });
        },
        templates: {
          header() {
            if (query) {
              return '';
            }
            return `
              <div class="aa-HitsHeader">
                <p>Search Results</p>
              </div>
            `;
          },
          item({ item }) {
            return reverseHighlightItem({ item, attribute: 'query' });
          },
        },
      },
    ];
  },
});
