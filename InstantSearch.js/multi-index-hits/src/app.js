/* global instantsearch algoliasearch */

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const subIndex = instantsearch({
  indexName: 'instant_search_price_desc',
  searchClient,
});

subIndex.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 16,
  })
);

subIndex.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-instant-search-price-desc',
    templates: {
      item:
        '{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}',
    },
  })
);

const mainIndex = instantsearch({
  indexName: 'instant_search',
  searchClient,
  searchFunction(helper) {
    subIndex.helper.setQuery(helper.state.query).search();
    helper.search();
  },
});

mainIndex.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  })
);

mainIndex.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  })
);

mainIndex.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-instant-search',
    templates: {
      item:
        '{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}',
    },
  })
);

subIndex.start();
mainIndex.start();
