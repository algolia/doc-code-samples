/* global instantsearch algoliasearch */

const { EXPERIMENTAL_autocomplete } = instantsearch.widgets;

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
});

const sectionHeader = (title, html) => html`
  <span class="ais-AutocompleteIndexHeaderTitle">${title}</span>
  <span class="ais-AutocompleteIndexHeaderLine"></span>
`;

// Quick-access cards. In production these come from an Algolia Rule that
// returns custom JSON on `results.userData`. The public demo index has no such
// Rule, so this constant stands in for that data.
const QUICK_ACCESS = [
  {
    title: 'Spring sale',
    subtitle: 'up to 60% off',
    image: 'https://picsum.photos/seed/spring-sale/300/200',
    href: '#',
  },
  {
    title: 'New collection',
    subtitle: 'spring / summer',
    image: 'https://picsum.photos/seed/new-collection/300/200',
    href: '#',
  },
];

search.addWidgets([
  EXPERIMENTAL_autocomplete({
    container: '#autocomplete',
    placeholder: 'Search for products',

    // Left column, top: recent searches (stored in localStorage)
    showRecent: {
      templates: {
        header: (_, { html }) => sectionHeader('Recent searches', html),
      },
    },

    // Left column, bottom: popular searches / Query Suggestions.
    // No header here — the panel renders it so the label can switch between
    // "Popular searches" (empty query) and "Suggestions" (typing).
    showQuerySuggestions: {
      indexName: 'instant_search_demo_query_suggestions',
      searchParameters: { hitsPerPage: 5 },
    },

    // Right column: product previews with image, name, price, and highlight
    indices: [
      {
        indexName: 'instant_search',
        searchParameters: { hitsPerPage: 5 },
        templates: {
          header: ({ items }, { html }) =>
            items.length === 0 ? null : sectionHeader('Products', html),
          noResults: (_, { html }) =>
            html`<div class="demo-empty">No products found.</div>`,
          item: ({ item }, { html, components }) => html`
            <div class="demo-product">
              <div class="demo-product-image">
                <img src="${item.image}" alt="${item.name}" />
              </div>
              <div>
                <p class="demo-product-name">
                  <${components.Highlight} hit=${item} attribute="name" />
                </p>
                <p class="demo-product-meta">${item.brand} · $${item.price}</p>
              </div>
            </div>
          `,
        },
      },
    ],

    // Arrange the sources into two columns. The panel receives `elements`
    // (keyed by `recent`, `suggestions`, and each index name) and `indices`
    // (each with its raw `results`), which is what makes the federated
    // behavior possible:
    //   - read `results.query` to switch between the empty and typing states
    //   - read `results.userData` (Rule data) for the quick-access cards
    //   - read `results.hits[0]` to derive a category from the top product
    templates: {
      panel: ({ elements, indices }, { html }) => {
        const products = indices.find(
          (index) => index.indexName === 'instant_search'
        );
        const suggestions = indices.find(
          (index) =>
            index.indexName === 'instant_search_demo_query_suggestions'
        );
        const productResults = (products && products.results) || {};
        const suggestionHits = (suggestions && suggestions.hits) || [];
        const topProduct = (productResults.hits && productResults.hits[0]) || {};
        const userData = productResults.userData || [];

        const isEmptyQuery = productResults.query === '';
        const hasSuggestions = suggestionHits.length > 0;
        const quickAccess = (userData[0] && userData[0].items) || QUICK_ACCESS;
        const categories = topProduct.categories || [];

        return html`
          <div class="demo-grid">
            <div class="demo-column">
              ${elements.recent}
              ${hasSuggestions
                ? html`<div class="ais-AutocompleteIndexHeader">
                    ${sectionHeader(
                      isEmptyQuery ? 'Popular searches' : 'Suggestions',
                      html
                    )}
                  </div>`
                : null}
              ${elements.suggestions}
              ${!isEmptyQuery && categories.length > 0
                ? html`<div class="demo-category">
                    <span class="demo-category-icon">▦</span>
                    <span class="demo-category-path"
                      >${categories.join(' › ')}</span
                    >
                  </div>`
                : null}
            </div>
            <div class="demo-column">
              ${isEmptyQuery && quickAccess.length > 0
                ? html`
                    <span class="ais-AutocompleteIndexHeaderTitle"
                      >Quick access</span
                    >
                    <ul class="demo-quick">
                      ${quickAccess.map(
                        (entry) => html`
                          <li>
                            <a class="demo-quick-item" href="${entry.href}">
                              <img src="${entry.image}" alt="" />
                              <span class="demo-quick-title"
                                >${entry.title}</span
                              >
                              <span class="demo-quick-subtitle"
                                >${entry.subtitle}</span
                              >
                            </a>
                          </li>
                        `
                      )}
                    </ul>
                  `
                : html`
                    ${elements['instant_search']}
                    ${productResults.nbHits > 5
                      ? html`<a class="demo-see-all" href="#">See all ${productResults.nbHits.toLocaleString()} results</a>`
                      : null}
                  `}
            </div>
          </div>
        `;
      },
    },
  }),
]);

search.start();
