/* global algoliasearch instantsearch */

import { createResponsiveFiltersWidgets } from './responsiveFilters.js';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.infiniteHits({
    container: '#hits',
    templates: {
      item(hit, { html, components: { Highlight } }) {
        return html`
          <article>
            <h4><${Highlight} attribute="name" hit=${hit} /></h4>
            <p>
              <${Highlight} attribute="description" hit=${hit} />
            </p>
          </article>
        `;
      },
    },
  }),
  instantsearch.widgets.sortBy({
    container: '#sort-by',
    items: [
      { label: 'Featured', value: 'instant_search' },
      { label: 'Price ascending', value: 'instant_search_price_asc' },
      { label: 'Price descending', value: 'instant_search_price_desc' },
    ],
  }),
  instantsearch.widgets.panel({ templates: { header: 'Category' } })(
    instantsearch.widgets.hierarchicalMenu
  )({
    attributes: [
      'hierarchicalCategories.lvl0',
      'hierarchicalCategories.lvl1',
      'hierarchicalCategories.lvl2',
      'hierarchicalCategories.lvl3',
    ],
    container: '#category',
  }),
  instantsearch.widgets.panel({ templates: { header: 'Brand' } })(
    instantsearch.widgets.refinementList
  )({
    attribute: 'brand',
    container: '#brand',
  }),
  instantsearch.widgets.panel({ templates: { header: 'Price' } })(
    instantsearch.widgets.rangeInput
  )({
    attribute: 'price',
    container: '#price',
  }),
  ...createResponsiveFiltersWidgets(),
]);

search.start();
