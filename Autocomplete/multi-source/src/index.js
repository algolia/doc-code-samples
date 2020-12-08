import algoliasearch from 'algoliasearch/lite';
import { autocomplete } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { predefinedItemsPlugin } from './predefinedItemsPlugin';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'RECENT_SEARCH',
  limit: 5,
});

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'instant_search_demo_query_suggestions',
  getSearchParams() {
    return recentSearchesPlugin.data.getAlgoliaSearchParams({
      hitsPerPage: 5,
    });
  },
});

const index = searchClient.initIndex('instant_search');
const hitsContainer = document.querySelector('#hits');

function render({ hits }, container) {
  container.innerHTML = hits
    .map(
      (hit) => `
        <article class="hit">
          <div class="image-wrapper"><img src="${hit.image}" /></div>
          <p class="name">${hit._highlightResult.name.value}</p>
          <p class="price">$${hit.price}</p>
        </article>
      `
    )
    .join('');
}

autocomplete({
  container: '#autocomplete',
  plugins: [
    predefinedItemsPlugin,
    recentSearchesPlugin,
    querySuggestionsPlugin,
  ],
  openOnFocus: true,
  onSubmit({ state }) {
    index.search(state.query).then((result) => {
      render(result, hitsContainer);
    });
  },
});
