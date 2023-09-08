import connectGeoSearch, {
  GeoSearchConnector,
} from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';
import { useConnector } from 'react-instantsearch-hooks-web';

import type {
  GeoSearchConnectorParams,
  GeoSearchWidgetDescription,
} from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';
import { BaseHit } from 'instantsearch.js';

type UseGeoSearchProps<THit extends BaseHit> = GeoSearchConnectorParams<THit>;

export function useGeoSearch<THit extends BaseHit>(
  props?: UseGeoSearchProps<THit>
) {
  return useConnector<
    GeoSearchConnectorParams<THit>,
    GeoSearchWidgetDescription<THit>
  >(connectGeoSearch as GeoSearchConnector<THit>, props);
}
