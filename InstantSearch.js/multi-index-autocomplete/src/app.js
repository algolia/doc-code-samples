/* global $ instantsearch algoliasearch */

const autocomplete = instantsearch.connectors.connectAutocomplete(
  ({ indices, refine, widgetParams }, isFirstRendering) => {
    const { container } = widgetParams;

    if (isFirstRendering) {
      const optgroups = indices.map((index, idx) => ({
        $order: idx,
        id: index.index,
        name: index.index,
      }));

      container.html('<select id="ais-autocomplete"></select>');

      container.find('select').selectize({
        options: [],
        labelField: 'name',
        valueField: 'name',
        optgroupField: 'section',
        optgroupLabelField: 'name',
        optgroupValueField: 'id',
        highlight: false,
        onType: refine,
        onChange: refine,
        score() {
          return function() {
            return 1;
          };
        },
        render: {
          option: hit => `
            <div class="hit">${hit._highlightResult.name.value}</div>
          `,
        },
        optgroups,
      });

      return;
    }

    const [select] = container.find('select');

    select.selectize.clearOptions();
    indices.forEach(index => {
      if (index.results) {
        index.results.hits.forEach(hit =>
          select.selectize.addOption(
            Object.assign({}, hit, {
              section: index.index,
            })
          )
        );
      }
    });
    select.selectize.refreshOptions(select.selectize.isOpen);
  }
);

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 3,
  })
);

search.addWidget(
  autocomplete({
    container: $('#autocomplete'),
    indices: [{ value: 'bestbuy', label: 'bestbuy' }],
  })
);

search.start();
