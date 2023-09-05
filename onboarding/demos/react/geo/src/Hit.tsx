import React from 'react'
import { Highlight } from 'react-instantsearch-hooks-web'
import type { Hit as BaseHit } from 'instantsearch.js'

import { Airport } from './Airports'

type HitProps = {
  hit: BaseHit<Airport>
}

export function Hit({ hit }: HitProps) {
  return (
    <div className="hit">
      <h2 className="hit-name">
        <span className="hit-airport-name">
          <Highlight attribute="name" hit={hit} />{' '}
          <Highlight attribute="city" hit={hit} />{' '}
        </span>
        <span className="hit-airport-code">
          (<Highlight attribute="airport_id" hit={hit} />)
        </span>
      </h2>
      <p className="hit-location">
        <Highlight attribute="country" hit={hit} /> <br />
        <span className="hit-distance">
          {hit._rankingInfo && hit._rankingInfo.matchedGeoLocation && (
            <span>
              {Math.round(hit._rankingInfo.matchedGeoLocation.distance / 1000)}
              km away,{' '}
            </span>
          )}
          {hit.nb_airline_liaisons} connections
        </span>
      </p>
    </div>
  )
}
