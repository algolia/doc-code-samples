import { autocomplete } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { highlight } from 'instantsearch.js/es/helpers';
import {
  connectAutocomplete,
  connectSearchBox,
  connectHierarchicalMenu,
} from 'instantsearch.js/es/connectors';
import {
  configure,
  index,
  hits,
  hierarchicalMenu,
} from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

function createAutocompleteSearchBox() {
  const autocompleteRef = { current: null };
  const indicesRef = { current: [] };

  return connectAutocomplete(
    (
      { currentRefinement, indices, instantSearchInstance, widgetParams },
      isFirstRender
    ) => {
      indicesRef.current = indices || [];

      if (isFirstRender) {
        const { setUiState } = instantSearchInstance;

        autocompleteRef.current = autocomplete({
          container: widgetParams.container,
          placeholder: widgetParams.placeholder,
          openOnFocus: true,
          initialState: {
            query: currentRefinement,
          },
          onStateChange({ prevState, state }) {
            if (
              prevState.query !== state.query ||
              prevState.isOpen !== state.isOpen
            ) {
              setUiState(prevUiState => {
                return {
                  ...prevUiState,
                  ...indicesRef.current.reduce(
                    (indicesUiState, currentIndex) => {
                      return {
                        ...indicesUiState,
                        [currentIndex.indexName]: {
                          query: state.query,
                        },
                      };
                    },
                    {}
                  ),
                };
              });
            }
          },
          onSubmit({ state }) {
            setUiState(prevUiState => {
              return {
                ...prevUiState,
                instant_search: {
                  ...prevUiState.instant_search,
                  query: state.query,
                  hierarchicalMenu: {
                    'hierarchicalCategories.lvl0': [],
                  },
                },
              };
            });
          },
          getSources() {
            return indicesRef.current.map(currentIndex => {
              return {
                getInputValue({ suggestion }) {
                  return suggestion.query;
                },
                getSuggestions() {
                  return currentIndex.hits.reduce((acc, current, i) => {
                    const itemCategories = current.instant_search.facets.exact_matches.categories.map(
                      x => x.value
                    );

                    const categories =
                      i === 0 && itemCategories.length > 0
                        ? [itemCategories[0]]
                        : [];

                    const itemWithoutCategories = {
                      query: current.query,
                      categories: [],
                      ...current,
                    };

                    const items = categories.map(category => {
                      return {
                        query: current.query,
                        categories: [category],
                        ...current,
                      };
                    });

                    acc.push(itemWithoutCategories, ...items);

                    return acc;
                  }, []);
                },
                onSelect({ suggestion }) {
                  setUiState(prevUiState => {
                    const category = suggestion.categories[0];

                    return {
                      ...prevUiState,
                      instant_search: {
                        ...prevUiState.instant_search,
                        query: suggestion.query,
                        hierarchicalMenu: {
                          'hierarchicalCategories.lvl0': category
                            ? [category]
                            : [],
                        },
                      },
                    };
                  });
                },
                templates: {
                  item({ item }) {
                    const category = item.categories[0];

                    if (category) {
                      return `
                        <div class="autocomplete-item">
                          <div class="autocomplete-item-content">
                            <div class="item-info">
                              in <span class="item-category">${category}</span>
                            </div>
                          </div>
                        </div>
                      `;
                    }

                    return `
                      <div class="autocomplete-item">
                        <div class="autocomplete-item-content">
                          <svg viewBox="0 0 18 18" width="16" height="16">
                            <path d="M13.14 13.14L17 17l-3.86-3.86A7.11 7.11 0 1 1 3.08 3.08a7.11 7.11 0 0 1 10.06 10.06z" stroke="currentColor" stroke-width="1.78" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>

                          <span>${highlight({
                            hit: item,
                            attribute: 'query',
                          })}</span>
                        </div>
                      </div>
                    `;
                  },
                },
              };
            });
          },
        });
      } else if (autocompleteRef.current) {
        autocompleteRef.current.refresh();
      }
    }
  );
}

const search = instantsearch({
  searchClient,
  indexName: 'instant_search',
});

const autocompleteSearchBox = createAutocompleteSearchBox();
const virtualSearchBox = connectSearchBox(() => {});
const virtualHierarchicalMenu = connectHierarchicalMenu(() => {});

search.addWidgets([
  index({
    indexName: 'instant_search_demo_query_suggestions',
  }).addWidgets([
    // You can add other Query Suggestions indices:
    // index({
    //   indexName: "instant_search_demo_query_suggestions"
    // }),
    configure({
      hitsPerPage: 5,
    }),
    // We need to add a refinement list with the same attribute as the parent index
    // to reset the filter and to search suggestions in all categories.
    virtualHierarchicalMenu({
      attributes: [
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
      ],
    }),
    autocompleteSearchBox({
      container: '#autocomplete',
      placeholder: 'Search products',
    }),
  ]),
  virtualSearchBox({}),
  hierarchicalMenu({
    container: '#categories',
    attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1'],
  }),
  hits({
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
]);

search.start();
