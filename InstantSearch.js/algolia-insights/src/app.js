/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient: algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5'),
  searchParameters: {
    clickAnalytics: true,
  },
  insightsClient: window.aa,
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  })
);

search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
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
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.start();
