import connectGeoSearch from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';
import { useConnector } from 'react-instantsearch-hooks-web';

import type {
  GeoSearchConnectorParams,
  GeoSearchWidgetDescription,
} from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';

type UseGeoSearchProps = GeoSearchConnectorParams;

export function useGeoSearch(props?: UseGeoSearchProps) {
  return useConnector<GeoSearchConnectorParams, GeoSearchWidgetDescription>(
    connectGeoSearch,
    props
  );
}
