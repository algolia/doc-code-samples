/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'instant_search',
  searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
  routing: true,
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
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
        </div>
      `,
    },
  })
);

const categoryMenu = instantsearch.widgets.panel({
  templates: {
    header: 'Category',
  },
})(instantsearch.widgets.menu);

search.addWidget(
  categoryMenu({
    container: '#menu',
    attribute: 'categories',
  })
);

const brandList = instantsearch.widgets.panel({
  templates: {
    header: 'Brands',
  },
})(instantsearch.widgets.refinementList);

search.addWidget(
  brandList({
    container: '#refinement-list',
    attribute: 'brand',
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.start();
