/* global instantsearch */
const algoliasearch = window['algoliasearch/lite'].liteClient;

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const categoryMenu = instantsearch.widgets.panel({
  templates: {
    header: 'Category',
  },
})(instantsearch.widgets.menu);

const brandList = instantsearch.widgets.panel({
  templates: {
    header: 'Brands',
  },
})(instantsearch.widgets.refinementList);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
  routing: true,
  insights: true,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
        </div>
      `,
    },
  }),
  categoryMenu({
    container: '#menu',
    attribute: 'categories',
  }),
  brandList({
    container: '#refinement-list',
    attribute: 'brand',
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
