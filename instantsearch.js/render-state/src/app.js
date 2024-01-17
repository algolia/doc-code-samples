import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import {
  searchBox,
  hits,
  refinementList,
  hierarchicalMenu,
  pagination,
  panel,
  currentRefinements,
} from 'instantsearch.js/es/widgets';
import { connectHits } from 'instantsearch.js/es/connectors';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const indexName = 'instant_search';

const search = instantsearch({
  indexName,
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
  insights: true,
});

const emptyHits = connectHits(({ hits, widgetParams }) => {
  const container = document.querySelector(widgetParams.container);
  if (hits.length > 0) {
    container.innerHTML = '';
    return;
  }

  const brandState = search.renderState[indexName].refinementList.brand;
  const isPearRefined =
    brandState.items.filter((item) => item.label === 'Pear' && item.isRefined)
      .length > 0;

  if (!isPearRefined) {
    container.innerHTML = 'No results';
    return;
  }

  container.innerHTML = `
    <p>No results for Pear</p>
    <button type="button" class="button">
      Remove "Pear"
    </button>
  `;
  container.querySelector('button').addEventListener('click', () => {
    search.renderState[indexName].refinementList.brand.refine('Pear');
  });
});

search.addWidgets([
  searchBox({
    container: '#searchbox',
  }),
  currentRefinements({
    container: '#current-refinements',
  }),
  hits({
    container: '#hits',
    templates: {
      empty: () => null,
      item: (hit, { html, components }) => html`
        <article>
          <h1>${components.Highlight({ hit, attribute: 'name' })}</h1>
          <p>${components.Highlight({ hit, attribute: 'description' })}</p>
        </article>
      `,
    },
  }),
  emptyHits({
    container: '#empty-hits',
  }),
  panel({
    templates: {
      header: 'Brand',
    },
  })(refinementList)({
    container: '#brand',
    attribute: 'brand',
    sortBy: ['isRefined'],
  }),
  panel({
    templates: {
      header: 'Categories',
    },
    hidden({ items }) {
      return items.length === 0;
    },
  })(hierarchicalMenu)({
    container: '#categories',
    attributes: [
      'hierarchicalCategories.lvl0',
      'hierarchicalCategories.lvl1',
      'hierarchicalCategories.lvl2',
      'hierarchicalCategories.lvl3',
    ],
  }),
  pagination({
    container: '#pagination',
  }),
]);

search.start();

document
  .querySelector('#predefined-search-button')
  .addEventListener('click', () => {
    search.renderState[indexName].refinementList.brand.refine('Pear');
  });

window.search = search;
