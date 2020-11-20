import algoliasearch from 'algoliasearch/lite';
import { autocomplete, highlightHit } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';

const recentSearches = createLocalStorageRecentSearchesPlugin({
  key: 'RECENT_SEARCH',
  limit: 5,
});

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);
const index = searchClient.initIndex('instant_search');

autocomplete({
  container: '#autocomplete',
  plugins: [recentSearches],
  openOnFocus: true,
  onSubmit({ state }) {
    index.search(state.query).then((result) => {
      console.log({
        highlighted: highlightHit({ attribute: 'name', hit: result.hits[0] }),
        result,
      });
      document.querySelector('#hits').innerHTML = result.hits
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
    });
  },
});
