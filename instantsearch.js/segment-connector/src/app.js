/* global analytics */

import instantsearch from 'instantsearch.js';
import {
  searchBox,
  hits,
  refinementList,
  pagination,
  rangeSlider,
} from 'instantsearch.js/es/widgets';
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
});

search.addWidgets([
  searchBox({
    container: '#searchbox',
  }),
  hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components, sendEvent }) => html`
        <article>
          <h1>${components.Highlight({ hit, attribute: 'name' })}</h1>
          <p>${components.Highlight({ hit, attribute: 'description' })}</p>
          <button type="button" onClick="${() => sendEvent('view', hit, 'View')}">
            View Product
          </button>
          <button type="button" onClick="${() => sendEvent('click', hit, 'Favorite')}">
            Favorite
          </button>
          <button type="button" onClick="${() => sendEvent('conversion', hit, 'Add to Cart')}">
            Add to Cart
          </button>
          <button type="button" onClick="${() => sendEvent('conversion', hit, 'Order')}">
            Order Now
          </button>
        </article>
      `
    },
  }),
  refinementList({
    container: '#brand-list',
    attribute: 'brand',
  }),
  rangeSlider({
    container: '#price',
    attribute: 'price',
  }),
  pagination({
    container: '#pagination',
  }),
]);

// Set userToken to Segment
analytics.identify('my-user-token');

const insightsMiddleware = createInsightsMiddleware({
  insightsClient: null,
  onEvent(event) {
    const { widgetType, eventType, payload, hits, attribute } = event;

    console.log(event);
    if (widgetType === 'ais.hits' && eventType === 'view') {
      analytics.track('Product List Viewed', {
        index: payload.index,
        products: hits.map(hit => ({
          objectID: hit.objectID,
          // the rest...
        })),
      });
    } else if (widgetType === 'ais.refinementList' && eventType === 'click') {
      analytics.track('Product List Filtered', {
        index: payload.index,
        filters: payload.filters.map(filter => ({
          type: attribute,
          value: filter,
        })),
      });
    } else if (payload.eventName === 'Favorite') {
      analytics.track('Product Clicked', {
        objectID: payload.objectIDs[0],
        position: payload.positions[0],
        index: payload.index,
        queryID: payload.queryID,
        // the rest...
      });
    } else if (payload.eventName === 'Add to Cart') {
      analytics.track('Product Clicked', {
        objectID: payload.objectIDs[0],
        index: payload.index,
        queryID: payload.queryID,
        // the rest...
      });
    } else if (payload.eventName === 'View Product') {
      analytics.track('Product Viewed', {
        objectID: payload.objectIDs[0],
        index: payload.index,
        // the rest...
      });
    } else if (payload.eventName === 'Order') {
      analytics.track('Order Completed', {
        products: hits.map(hit => ({
          objectID: hit.objectID,
          // the rest...
        })),
        index: payload.index,
        queryID: hits[0].__queryID,
        // the rest...
      });
    }
  },
});
search.use(insightsMiddleware);
search.start();
