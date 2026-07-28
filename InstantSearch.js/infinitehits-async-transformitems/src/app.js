/* global instantsearch algoliasearch */

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient: algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5'),
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  }),
  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
  }),
  instantsearch.widgets.infiniteHits({
    transformItems: (items) => {
      setTimeout(() => {
        for (const item of items) {
          document
            .getElementById(item.objectID)
            .querySelector('mark').innerHTML = 100; // see <mark> in hits template
        }
      }, 2000);

      return items;
    },
    container: '#hits',
    templates: {
      item: `
        <div id="{{objectID}}">
          <img src="{{image}}" align="left" alt="{{name}}" />
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <div class="hit-price">\${{price}}</div>
          <mark></mark>
        </div>
      `,
    },
  }),
]);

search.start();
