/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient: algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5'),
  insights: true,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  }),
  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, sendEvent }) => html`
        <div>
          <img src="${hit.image}" align="left" alt="${hit.name}" />
          <div class="hit-name">
            ${hit.name}
          </div>
          <div>
            <button
              onclick="${() => sendEvent('click', hit, 'my-click-event')}"
            >
              Click event
            </button>
            <button
              onclick="${() =>
                sendEvent('conversion', hit, 'my-conversion-event')}"
            >
              Conversion event
            </button>
          </div>
        </div>
      `,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
