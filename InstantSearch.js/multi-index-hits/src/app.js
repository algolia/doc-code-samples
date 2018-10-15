/* global instantsearch algoliasearch */

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const subIndex = instantsearch({
  indexName: 'bestbuy',
  searchClient,
});

subIndex.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 16,
  })
);

subIndex.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-best-buy',
    templates: {
      item: '{{{ _highlightResult.name.value }}}',
    },
  })
);

const mainIndex = instantsearch({
  indexName: 'instant_search',
  searchFunction(helper) {
    subIndex.helper.setQuery(helper.state.query).search();
    helper.search();
  },
  searchClient,
});

mainIndex.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  })
);

mainIndex.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    autofocus: false,
  })
);

mainIndex.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-instant-search',
    templates: {
      item: '{{{ _highlightResult.name.value }}}',
    },
  })
);

subIndex.start();
mainIndex.start();
