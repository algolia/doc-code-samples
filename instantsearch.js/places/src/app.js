/* global instantsearch algoliasearch $script */

$script(
  'https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyBawL8VbstJDdU5397SUX7pEt9DslAwWgQ',
  () => {
    const searchClient = algoliasearch(
      'latency',
      '6be0576ff61c053d5f9a3225e2a90f76'
    );

    const search = instantsearch({
      indexName: 'airports',
      searchClient,
    });

    search.addWidgets([
      instantsearch.widgets.places({
        container: '#searchbox',
        placesReference: window.places,
      }),
      instantsearch.widgets.geoSearch({
        container: '#maps',
        googleReference: window.google,
      }),
    ]);

    search.start();
  }
);
