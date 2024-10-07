/* global algoliasearch, instantsearch */

const search = instantsearch({
  indexName: 'demo_geo',
  searchClient: algoliasearch('B1G2GM9NG0', 'aadef574be1f9252bb48d4ea09b5cfe5'),
})

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 6,
    getRankingInfo: true,
    aroundLatLngViaIP: true,
    typoTolerance: 'min',
  })
)

// Uncomment the following widget to add a map.

/* const InfoWindow = new window.google.maps.InfoWindow()

search.addWidget(
  instantsearch.widgets.geoSearch({
    container: '#map',
    googleReference: window.google,
    initialZoom: 4,
    mapOptions: {
      streetViewControl: false,
      mapTypeControl: false,
      zoom: 4,
      minZoom: 3,
      maxZoom: 6,
      styles: [{ stylers: [{ hue: '#3596D2' }] }],
    },
    enableRefineControl: false,
    enableRefineOnMapMove: false,
    enableClearMapRefinement: false,
    builtInMarker: {
      events: {
        click: ({ event, item, marker, map }) => {
          if (InfoWindow.getMap()) InfoWindow.close()
          InfoWindow.setContent(
            `${item.name} - ${item.name === item.city ? '' : `${item.city}, `}${
              item.country
            }<br>${item.nb_airline_liaisons} liaisons`
          )
          InfoWindow.open(map, marker)
        },
      },
    },
  })
) */

// Uncomment the following widget to add a search bar.

/* search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search airports by name, city, airport code',
    autofocus: false,
  })
) */

// Uncomment the following widget to add hits list.

/* search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: () => 'No results.',
      item(hit, { html, components }) {
        return html`
          <div class="hit">
            <h2 class="hit-name">
              <span class="hit-airport-name">
                ${components.Highlight({ attribute: 'name', hit })} ${' '}
                ${components.Highlight({ attribute: 'city', hit })}
              </span>
              ${' '}
              <span class="hit-airport-code">
                (${components.Highlight({ attribute: 'airport_id', hit })})
              </span>
            </h2>
            <p class="hit-location">
              ${components.Highlight({ attribute: 'country', hit })}<br />
              <span class="hit-distance">
                ${hit._rankingInfo && hit._rankingInfo.matchedGeoLocation
                  ? html`<span>
                      ${parseInt(
                        hit._rankingInfo.matchedGeoLocation.distance / 1000,
                        10
                      )}km
                      away,${' '}
                    </span>`
                  : html``}
                ${hit.nb_airline_liaisons} liaisons
              </span>
            </p>
          </div>
        `
      },
    },
  })
) */

// Uncomment the following widget to add search stats.

/* search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats',
    templates: {
      text(hit, { html }) {
        return html`<span role="img" aria-label="emoji">⚡️</span>
          <strong>${hit.nbHits}</strong> results found ${' '}
          ${hit.query != ''
            ? html`for <strong>"${hit.query}"</strong>`
            : html``}
          ${' '} in <strong>${hit.processingTimeMS}ms</strong>`
      },
    },
  })
) */

search.start()
