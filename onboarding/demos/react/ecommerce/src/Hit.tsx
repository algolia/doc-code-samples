import React from 'react'
import { Highlight, Snippet } from 'react-instantsearch-hooks-web'
import type { Hit } from 'instantsearch.js'

type HitProps = {
  hit: Hit
}

export function Hit({ hit }: HitProps) {
  return (
    <div className="hit">
      <div className="hit-image">
        <img src={hit.image} />
      </div>
      <div className="hit-content">
        <div>
          <div className="hit-name">
            <Highlight attribute="name" hit={hit} highlightedTagName="em" />
          </div>
          <div className="hit-description">
            <Snippet attribute="description" hit={hit} />
          </div>
        </div>
        <div className="hit-price">${hit.price}</div>
      </div>
    </div>
  )
}
