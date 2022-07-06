import { useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { useConnector, useSearchBox } from 'react-instantsearch-hooks-web';
import connectGeoSearch, {
  GeoHit,
  GeoSearchConnectorParams,
  GeoSearchWidgetDescription,
} from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';

type UseGeoSearchProps = GeoSearchConnectorParams;

function useGeoSearch(props?: UseGeoSearchProps) {
  return useConnector<GeoSearchConnectorParams, GeoSearchWidgetDescription>(
    connectGeoSearch,
    props
  );
}

export function Airports() {
  const skipViewEffect = useRef(false);

  const { query, refine: refineQuery } = useSearchBox();
  const {
    items,
    refine: refineItems,
    currentRefinement,
    clearMapRefinement,
  } = useGeoSearch();

  const onViewChange = ({ target }) => {
    skipViewEffect.current = true;

    if (query.length > 0) {
      refineQuery('');
    }

    refineItems({
      northEast: target.getBounds().getNorthEast(),
      southWest: target.getBounds().getSouthWest(),
    });
  };

  const map = useMapEvents({
    zoomend: onViewChange,
    dragend: onViewChange,
  });

  useEffect(() => {
    if (currentRefinement) {
      clearMapRefinement();
    }

    if (items.length > 0 && !skipViewEffect.current) {
      map.setView(items[0]._geoloc);
    }

    skipViewEffect.current = false;
  }, [query]);

  return (
    <>
      {items.map((item) => (
        <Marker
          key={item.objectID}
          position={item._geoloc}
          icon={createAirportIcon(item)}
        >
          <Popup>
            <strong>{item.name}</strong>
            <br />
            {item.city}, {item.country}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function createAirportIcon(item: GeoHit) {
  return new DivIcon({
    html: renderToStaticMarkup(<div className="marker">{item.airport_id}</div>),
    popupAnchor: [0, -15],
  });
}
