/* global algoliasearch instantsearch */

const algoliaClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => Boolean(params.query) === false)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

const search = instantsearch({
  indexName: 'instant_search',
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
      empty: `
        {{#query}}
          No results for <q>{{query}}</q>
        {{/query}}
      `,
      item: `
        <article>
          <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
          <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
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
