/* global algoliasearch instantsearch analytics */

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: hit => `
        <article>
          <h1>${instantsearch.highlight({ attribute: 'name', hit })}</h1>
          <p>${instantsearch.highlight({ attribute: 'description', hit })}</p>
          <button class="btn-add-to-cart" data-add-to-cart-payload='${JSON.stringify(
            /* eslint-disable camelcase */
            {
              product_id: hit.objectID,
              name: hit.name,
              brand: hit.brand,
              price: hit.price,
              position: hit.__position,
              image_url: hit.image,
              index: 'instant_search',
              queryID: hit.__queryID,
            }
            /* eslint-enable camelcase */
          )}'>Add to cart</button>
        </article>
      `,
    },
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
);

search.start();

search.helper.on('result', result => {
  const { hits, index } = result;
  analytics.track('Product List Viewed', {
    products: hits.map(
      /* eslint-disable camelcase */
      ({ objectID, brand, name, image, price, __position }) => ({
        product_id: objectID,
        name,
        brand,
        price,
        position: __position,
        image_url: image,
      })
      /* eslint-enable camelcase */
    ),
    index,
  });
});

document.addEventListener('click', event => {
  const elem = event.target;
  if (elem.matches('.btn-add-to-cart')) {
    const payload = JSON.parse(elem.getAttribute('data-add-to-cart-payload'));
    analytics.track('Product Clicked', payload);
  }
});
