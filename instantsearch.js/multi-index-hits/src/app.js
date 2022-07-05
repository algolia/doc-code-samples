/* global instantsearch algoliasearch */

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const subIndex = instantsearch({
  indexName: 'instant_search_price_desc',
  searchClient,
});

subIndex.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 16,
  }),
  instantsearch.widgets.hits({
    container: '#hits-instant-search-price-desc',
    templates: {
      item:
        '{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}',
    },
  }),
]);

const mainIndex = instantsearch({
  indexName: 'instant_search',
  searchClient,
  searchFunction(helper) {
    subIndex.helper.setQuery(helper.state.query).search();
    helper.search();
  },
});

mainIndex.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits-instant-search',
    templates: {
      item:
        '{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}',
    },
  }),
]);

subIndex.start();
mainIndex.start();
