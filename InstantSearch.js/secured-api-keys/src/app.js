/* global instantsearch */

const SERVER_DATA = window.SERVER_DATA;

delete window.SERVER_DATA;

const search = instantsearch({
  appId: 'B1G2GM9NG0',
  apiKey: SERVER_DATA.ALGOLIA_API_KEY,
  indexName: 'demo_ecommerce',
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
