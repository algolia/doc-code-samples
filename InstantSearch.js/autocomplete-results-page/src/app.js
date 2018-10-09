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
        searchField: 'name',
        highlight: false,
        onType: refine,
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

const suggestions = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
});

suggestions.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 5,
  })
);

suggestions.addWidget(
  autocomplete({
    container: $('#autocomplete'),
    onSelectChange(value) {
      // eslint-disable-next-line
      search.helper.setQuery(value).search();
    },
  })
);

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 10,
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div class="ais-Hits-item">
          <header class="hit-name">
            {{{_highlightResult.name.value}}}
          </header>
          <p class="hit-description">
            {{{_highlightResult.description.value}}}
          </p>
        </div>
      `,
    },
  })
);

suggestions.start();
search.start();
