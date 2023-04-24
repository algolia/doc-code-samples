/* global $ instantsearch algoliasearch */

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

const autocomplete = instantsearch.connectors.connectAutocomplete(
  ({ indices, refine, widgetParams }, isFirstRendering) => {
    const { container, onSelectChange } = widgetParams;

    if (isFirstRendering) {
      container.html('<select id="ais-autocomplete"></select>');

      container.find('select').selectize({
        options: [],
        valueField: 'name',
        labelField: 'name',
        highlight: false,
        onType: refine,
        onBlur() {
          refine(this.getValue());
        },
        score() {
          return function() {
            return 1;
          };
        },
        onChange(value) {
          onSelectChange(value);
          refine(value);
        },
      });

      return;
    }

    const [select] = container.find('select');

    indices.forEach(index => {
      select.selectize.clearOptions();
      index.results.hits.forEach(h => select.selectize.addOption(h));
      select.selectize.refreshOptions(select.selectize.isOpen);
    });
  }
);

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
});

search.addWidgets([
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

const suggestions = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
  insights: true,
});

suggestions.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 5,
  }),
  autocomplete({
    container: $('#autocomplete'),
    onSelectChange(value) {
      search.helper.setQuery(value).search();
    },
  }),
]);

suggestions.start();
search.start();
