/* global $ instantsearch algoliasearch */

const searchClient = algoliasearch(
  '89NKF76CVQ',
  '96a24f1f69041d121814204342394266'
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
          return function () {
            return 1;
          };
        },
        render: {
          option(item) {
            // prettier-ignore
            // console.log(item);
            // return;

            const [
              category,
            ] = item.nft_views.facets.exact_matches.category_name;

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
    indices.forEach((index) => {
      index.results.hits.forEach((hit) => select.selectize.addOption(hit));
    });
    select.selectize.refreshOptions(select.selectize.isOpen);
  }
);

const search = instantsearch({
  indexName: 'nft_views_query_suggestions',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets
    .index({ indexName: 'nft_views_query_suggestions' })
    .addWidgets([
      instantsearch.widgets.configure({
        hitsPerPage: 5,
      }),
      autocomplete({
        container: $('#autocomplete'),
        onSelectChange({ query, category }) {
          search.helper
            .setQuery(query)
            .removeDisjunctiveFacetRefinement('categories');

          if (category) {
            search.helper.addDisjunctiveFacetRefinement('categories', category);
          }

          search.helper.search();
        },
      }),
    ]),

  virtualRefinementList({
    attribute: 'categories',
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 10,
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <header class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </header>
          <p class="hit-description">
            {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
          </p>
        </div>
      `,
    },
  }),
]);

search.start();
