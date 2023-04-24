/* global algoliasearch instantsearch */

import injectScript from 'scriptjs';

injectScript(
  'https://maps.googleapis.com/maps/api/js?v=quarterly&key=AIzaSyBawL8VbstJDdU5397SUX7pEt9DslAwWgQ',
  () => {
    const searchClient = algoliasearch(
      'latency',
      '6be0576ff61c053d5f9a3225e2a90f76'
    );

    const search = instantsearch({
      indexName: 'airports',
      searchClient,
      insights: true,
    });

    search.addWidgets([
      instantsearch.widgets.searchBox({
        container: '#searchbox',
      }),
      instantsearch.widgets.geoSearch({
        container: '#maps',
        googleReference: window.google,
        templates: {
          HTMLMarker: `
            <span class="marker">
              {{ city }} - {{ airport_id }}
            </span>
          `,
        },
      }),
    ]);

    search.start();
  }
);
