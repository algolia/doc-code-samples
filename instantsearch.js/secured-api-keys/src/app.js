/* global instantsearch algoliasearch */

const SERVER_DATA = window.SERVER_DATA;

delete window.SERVER_DATA;

const searchClient = algoliasearch('B1G2GM9NG0', SERVER_DATA.ALGOLIA_API_KEY);

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
  insights: true,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.currentRefinements({
    container: '#current-refinements',
  }),
  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
  }),
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
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
