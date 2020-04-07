/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient: algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5'),
  insightsClient: window.aa,
});

search.addWidgets([
  instantsearch.widgets.configure({
    clickAnalytics: true,
  }),
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
      item: hit => `
        <div>
          <img src="${hit.image}" align="left" alt="${hit.name}" />
          <div class="hit-name">
            ${hit.name}
          </div>
          <div>
           <button ${instantsearch.insights('clickedObjectIDsAfterSearch', {
             eventName: 'click-result',
             objectIDs: [hit.objectID],
           })}>
             Click event
           </button>
           <button ${instantsearch.insights('convertedObjectIDsAfterSearch', {
             eventName: 'click-result',
             objectIDs: [hit.objectID],
           })}>
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
