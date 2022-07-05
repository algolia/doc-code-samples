/* global algoliasearch instantsearch */

import { createDropdown } from './Dropdown';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
});

const MOBILE_WIDTH = 375;

const brandDropdown = createDropdown(instantsearch.widgets.refinementList, {
  // closeOnChange: true,
  closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
  cssClasses: { root: 'my-BrandDropdown' },
});

const refinementListDropdown = createDropdown(
  instantsearch.widgets.refinementList,
  {
    // closeOnChange: true,
    closeOnChange: () => window.innerWidth >= MOBILE_WIDTH,
  }
);

const priceDropdown = createDropdown(instantsearch.widgets.rangeSlider, {
  buttonText({ start }) {
    const s = start && Number.isFinite(start[0]) ? start[0] : '';
    const e = start && Number.isFinite(start[1]) ? start[1] : '';
    return s || e ? `Price (${s}~${e})` : 'Price Slider';
  },
  buttonClassName({ start }) {
    const isRefined =
      Number.isFinite(start && start[0]) || Number.isFinite(start && start[1]);
    return isRefined && 'ais-Dropdown-button--refined';
  },
});

const priceMenuDropdown = createDropdown(instantsearch.widgets.numericMenu, {
  buttonText({ items }) {
    const refinedItem = (items || []).find(
      (item) => item.label !== 'All' && item.isRefined
    );
    return refinedItem ? `Price (${refinedItem.label})` : 'Price Menu';
  },
  buttonClassName({ items }) {
    const isRefined = (items || []).find(
      (item) => item.label !== 'All' && item.isRefined
    );
    return isRefined && 'ais-Dropdown-button--refined';
  },
});

const categoryDropdown = createDropdown(
  instantsearch.widgets.hierarchicalMenu,
  {
    buttonText: 'Category',
  }
);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
<article>
  <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
  <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
</article>
`,
    },
  }),
  brandDropdown({
    container: '#brand',
    attribute: 'brand',
    searchable: true,
  }),
  refinementListDropdown({
    container: '#type',
    attribute: 'type',
    searchable: true,
  }),
  priceDropdown({
    container: '#price',
    attribute: 'price',
  }),
  priceMenuDropdown({
    container: '#price2',
    attribute: 'price',
    items: [
      { label: 'All' },
      { end: 4, label: 'less than 4' },
      { start: 4, end: 4, label: '4' },
      { start: 5, end: 10, label: 'between 5 and 10' },
      { start: 10, label: 'more than 10' },
    ],
  }),
  categoryDropdown({
    container: '#category',
    attributes: [
      'hierarchicalCategories.lvl0',
      'hierarchicalCategories.lvl1',
      'hierarchicalCategories.lvl2',
    ],
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
