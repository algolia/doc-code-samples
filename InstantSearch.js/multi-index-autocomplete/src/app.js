/* global instantsearch algoliasearch */

const { autocomplete } = window['@algolia/autocomplete-js'];
const { connectAutocomplete } = instantsearch.connectors;
const { index, configure, hits } = instantsearch.widgets;
const highlight = instantsearch.highlight;

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const createAutocompleteSearchBox = () => {
  let suggestions;
  let autocompleteSearch;
  let prevQuery;

  return connectAutocomplete((props, isFirstRender) => {
    const { container } = props.widgetParams;

    suggestions = props.indices.reduce(
      (acc, current) => acc.concat(current.hits),
      []
    );

    if (isFirstRender) {
      autocompleteSearch = autocomplete({
        container,
        initialState: {
          query: props.currentRefinement,
        },
        onStateChange({ state }) {
          if (state.query !== prevQuery) {
            props.refine(state.query);
            prevQuery = state.query;
          }
        },
        onSubmit({ state }) {
          props.refine(state.query);
        },
        getSources() {
          return [
            {
              getInputValue({ suggestion }) {
                return suggestion.name;
              },
              getSuggestions() {
                return suggestions;
              },
              onSelect({ suggestion }) {
                props.refine(suggestion.name);
              },
              templates: {
                item({ item }) {
                  return `
                    <div class="autocomplete-item">
                      <svg viewBox="0 0 18 18" width="16" height="16">
                        <path d="M13.14 13.14L17 17l-3.86-3.86A7.11 7.11 0 1 1 3.08 3.08a7.11 7.11 0 0 1 10.06 10.06z" stroke="currentColor" stroke-width="1.78" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>

                      <div>
                        <span>${highlight({
                          hit: item,
                          attribute: 'name',
                        })}</span>
                      </div>
                    </div>
                `;
                },
              },
            },
          ];
        },
      });
    } else {
      autocompleteSearch.refresh();
    }
  });
};

const search = instantsearch({
  searchClient,
  indexName: 'instant_search',
  routing: true,
});

const autocompleteSearchBox = createAutocompleteSearchBox();

search.addWidgets([
  index({ indexName: 'instant_search_price_desc' }),
  configure({
    hitsPerPage: 3,
  }),
  autocompleteSearchBox({
    container: '#autocomplete',
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
