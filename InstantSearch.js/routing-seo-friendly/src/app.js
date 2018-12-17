/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'instant_search',
  searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
  routing: {
    router: instantsearch.routers.history({
      windowTitle(routeState) {
        return `Website / Find ${routeState.q} in ${routeState.brands} brands`;
      },
      createURL({ routeState, location }) {
        let baseUrl = location.href.split('/search/')[0];

        if (
          !routeState.q &&
          routeState.brands === 'all' &&
          routeState.p === 1
        ) {
          return baseUrl;
        }

        if (baseUrl[baseUrl.length - 1] !== '/') {
          baseUrl += '/';
        }

        const routeStateArray = [
          'q',
          encodeURIComponent(routeState.q),
          'brands',
          encodeURIComponent(routeState.brands),
          'p',
          routeState.p,
        ];

        return `${baseUrl}search/${routeStateArray.join('/')}`;
      },
      parseURL({ location }) {
        const routeStateString = location.href.split('/search/')[1];

        if (routeStateString === undefined) {
          return {};
        }

        const routeStateValues = routeStateString.match(
          /^q\/(.*?)\/brands\/(.*?)\/p\/(.*?)$/
        );

        return {
          q: decodeURIComponent(routeStateValues[1]),
          brands: decodeURIComponent(routeStateValues[2]),
          p: routeStateValues[3],
        };
      },
    }),
    stateMapping: {
      stateToRoute(uiState) {
        return {
          q: uiState.query || '',
          brands:
            (uiState.refinementList &&
              uiState.refinementList.brand &&
              uiState.refinementList.brand.join('~')) ||
            'all',
          p: uiState.page || 1,
        };
      },
      routeToState(routeState) {
        if (routeState.brands === 'all') {
          // eslint-disable-next-line no-param-reassign
          routeState.brands = undefined;
        }

        return {
          query: routeState.q,
          refinementList: {
            brand: routeState.brands && routeState.brands.split('~'),
          },
          page: routeState.p,
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
