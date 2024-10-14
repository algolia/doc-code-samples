/* global instantsearch */
const algoliasearch = window['algoliasearch/lite'].liteClient;

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
  insights: true,
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits-instant-search',
    templates: {
      item: (hit, { components }) => components.Highlight({ hit, attribute: 'name' })
    },
  }),
  instantsearch.widgets
    .index({ indexName: 'instant_search_price_desc' })
    .addWidgets([
      instantsearch.widgets.configure({
        hitsPerPage: 16,
      }),
      instantsearch.widgets.hits({
        container: '#hits-instant-search-price-desc',
        templates: {
          item: (hit, { components }) => components.Highlight({ hit, attribute: 'name' })
        },
      }),
    ]),
]);

search.start();
