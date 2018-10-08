/* global instantsearch algoliasearch */

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

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

document.querySelector('#refresh-cache').addEventListener('click', () => {
  search.refresh();
});

search.start();
