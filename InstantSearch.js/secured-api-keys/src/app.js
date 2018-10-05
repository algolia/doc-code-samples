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
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <article>
          <h1>{{{_highlightResult.name.value}}}</h1>
          <p>{{{_highlightResult.description.value}}}</p>
        </article>
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
