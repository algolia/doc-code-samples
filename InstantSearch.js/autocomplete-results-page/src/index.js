import { autocomplete } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import { highlight } from "instantsearch.js/es/helpers";
import { connectAutocomplete } from "instantsearch.js/es/connectors";
import { hits } from "instantsearch.js/es/widgets";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

const suggestionsRef = { current: [] };
let autocompleteSearch;

const autocompleteSearchBox = connectAutocomplete(
  ({ indices, currentRefinement, refine, widgetParams }, isFirstRender) => {
    const { container, attribute, limit } = widgetParams;
    // get the index.
    const qsIndex = indices[0];
    // store the current hits in the variable in the upper scope for the next render.
    suggestionsRef.current = qsIndex ? qsIndex.hits : [];

    if (isFirstRender) {
      // create the instance of `autocomplete` once.
      autocompleteSearch = autocomplete({
        container,
        openOnFocus: true,
        initialState: {
          query: currentRefinement
        },
        onStateChange({ state, prevState }) {
          if (state.query !== prevState.query) {
            // refine the search with new query
            refine(state.query);
          }
        },
        onSubmit({ state }) {
          refine(state.query);
        },
        getSources() {
          return [
            {
              getInputValue: ({ suggestion }) => suggestion[attribute],
              getSuggestions() {
                // return the hits, but not all.
                return suggestionsRef.current.slice(0, limit);
              },
              onSelect({ suggestion }) {
                // refine the search with the selected item
                refine(suggestion[attribute]);
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
                        attribute
                      })}</span>
                    </div>
                  </div>
              `;
                }
              }
            }
          ];
        }
      });
    } else {
      // refresh (re-render) the autocomplete at every render of InstantSearch
      autocompleteSearch.refresh();
    }
  }
);

const search = instantsearch({
  searchClient,
  indexName: "instant_search",
  routing: true
});

search.addWidgets([
  autocompleteSearchBox({
    container: "#autocomplete",
    attribute: "name",
    limit: 5
  }),
  hits({
    container: "#hits",
    templates: {
      item: `
        <article>
          <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
          <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
        </article>
      `
    }
  })
]);

search.start();
