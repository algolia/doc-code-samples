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
      item: (hit, { html, components }) => html`
        <div>
          <header class="hit-name">
            ${components.Highlight({ hit, attribute: 'name' })}
          </header>
          <img src="${hit.image}" align="left" />
          <p class="hit-description">
            ${components.Highlight({ hit, attribute: 'description' })}
          </p>
          <p class="hit-price">\$${hit.price}</p>
        </div>
      `,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
