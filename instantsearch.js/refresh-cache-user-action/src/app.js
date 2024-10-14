/* global instantsearch */
const algoliasearch = window['algoliasearch/lite'].liteClient;

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
  insights: true,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
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

document.querySelector('#refresh-cache').addEventListener('click', () => {
  search.refresh();
});

search.start();
