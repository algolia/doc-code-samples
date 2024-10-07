/* global algoliasearch, instantsearch */

import { hitTemplate } from './helpers'

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient: algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5'),
})

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 5,
    attributesToSnippet: ['description:24'],
    snippetEllipsisText: ' [...]',
  })
)

// Uncomment the following widget to add hits list.

/* search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: () => 'No results.',
      item: hitTemplate,
    },
  })
) */

// Uncomment the following widget to add a search bar.

/* search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search for products',
    autofocus: false,
  })
) */

// Uncomment the following widget to add search stats.

/* search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats',
    templates: {
      text(hit, { html }) {
        return html`<span role="img" aria-label="emoji">⚡️</span>
          <strong>${hit.nbHits}</strong> results found ${' '}
          ${hit.query != ''
            ? html`for <strong>"${hit.query}"</strong>`
            : html``}
          ${' '} in <strong>${hit.processingTimeMS}ms</strong>`
      },
    },
  })
) */

// Uncomment the following widget to add categories list.

/* search.addWidget(
  instantsearch.widgets.panel({
    templates: {
      header: () => 'Categories',
    },
  })(instantsearch.widgets.refinementList)({
    container: '#categories',
    attribute: 'categories',
  })
) */

// Uncomment the following widget to add brands list.

/* search.addWidget(
  instantsearch.widgets.panel({
    templates: {
      header: () => 'Brands',
    },
  })(instantsearch.widgets.refinementList)({
    container: '#brands',
    attribute: 'brand',
    searchable: true,
  })
) */

// Uncomment the following widget to add price range.

/* search.addWidget(
  instantsearch.widgets.panel({
    templates: {
      header: () => 'Price',
    },
  })(instantsearch.widgets.rangeSlider)({
    container: '#price',
    attribute: 'price',
  })
) */

// Uncomment the following widget to add pagination.

/* search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
) */

search.start()
