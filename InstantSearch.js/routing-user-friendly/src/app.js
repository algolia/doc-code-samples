/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'instant_search',
  searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
  routing: {
    stateMapping: {
      stateToRoute(uiState) {
        return {
          query: uiState.query,
          brands:
            uiState.refinementList && uiState.refinementList.brand.join('~'),
          page: uiState.page,
        };
      },
      routeToState(routeState) {
        return {
          query: routeState.query,
          refinementList: {
            brand: routeState.brands && routeState.brands.split('~'),
          },
          page: routeState.page,
        };
      },
    },
  },
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
        </div>
      `,
    },
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#refinement-list',
    attribute: 'brand',
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.start();
