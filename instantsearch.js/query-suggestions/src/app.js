/* global $ instantsearch algoliasearch */

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const virtualRefinementList = instantsearch.connectors.connectRefinementList(
  () => null
);

const autocomplete = instantsearch.connectors.connectAutocomplete(
  ({ indices, refine, widgetParams }, isFirstRendering) => {
    const { container, onSelectChange } = widgetParams;

    if (isFirstRendering) {
      container.html('<select id="ais-autocomplete"></select>');

      container.find('select').selectize({
        options: [],
        valueField: 'query',
        labelField: 'query',
        highlight: false,
        onType: refine,
        onBlur() {
          refine(this.getValue());
        },
        onChange(value) {
          refine(value);
          onSelectChange({
            category: this.getOption(value).data('category'),
            query: value,
          });
        },
        score() {
          return function() {
            return 1;
          };
        },
        render: {
          option(item) {
            // prettier-ignore
            const [category] = item.instant_search.facets.exact_matches.categories;

            return `
              <div class="option" data-category="${category.value}">
                ${item.query} in <i>${category.value}</i>
              </div>
            `;
          },
        },
      });

      return;
    }

    const [select] = container.find('select');

    select.selectize.clearOptions();
    indices.forEach(index => {
      index.results.hits.forEach(hit => select.selectize.addOption(hit));
    });
    select.selectize.refreshOptions(select.selectize.isOpen);
  }
);

const suggestions = instantsearch({
  indexName: 'instant_search_demo_query_suggestions',
  searchClient,
  insights: true,
});

suggestions.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 5,
  }),
  autocomplete({
    container: $('#autocomplete'),
    onSelectChange({ query, category }) {
      // eslint-disable-next-line
      search.helper
        .setQuery(query)
        .removeDisjunctiveFacetRefinement('categories');

      if (category) {
        // eslint-disable-next-line
        search.helper.addDisjunctiveFacetRefinement('categories', category);
      }

      // eslint-disable-next-line
      search.helper.search();
    },
  }),
]);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
  insights: true,
});

search.addWidgets([
  virtualRefinementList({
    attribute: 'categories',
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 10,
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
        <div>
          <header class="hit-name">
            ${components.Highlight({ hit, attribute: 'name' })}
          </header>
          <p class="hit-description">
            ${components.Highlight({ hit, attribute: 'description' })}
          </p>
        </div>
      `,
    },
  }),
]);

suggestions.start();
search.start();
