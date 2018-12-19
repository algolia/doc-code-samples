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
  instantsearch.widgets.currentRefinements({
    container: '#current-refinements',
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <header class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </header>
          <img src="{{image}}" align="left" />
          <p class="hit-description">
            {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
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
