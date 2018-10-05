/* global instantsearch algoliasearch */

const SERVER_DATA = window.SERVER_DATA;

delete window.SERVER_DATA;

const searchClient = algoliasearch('B1G2GM9NG0', SERVER_DATA.ALGOLIA_API_KEY);

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  })
);

search.addWidget(
  instantsearch.widgets.currentRefinedValues({
    container: '#current-refined-values',
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attributeName: 'brand',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div class="ais-Hits-item">
          <header class="hit-name">
            {{{_highlightResult.name.value}}}
          </header>
          <img src="{{image}}" align="left" />
          <p class="hit-description">
            {{{_highlightResult.description.value}}}
          </p>
          <p class="hit-price">\${{price}}</p>
        </div>
      `,
    },
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.start();
