import React from 'react'
import { Hits, useInstantSearch } from 'react-instantsearch-hooks-web'
import { Hit } from './Hit'

export function Content() {
  const { results } = useInstantSearch()

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <div>
        No results found for <strong>{results.query}</strong>.
      </div>
    )
  }

  return <Hits hitComponent={Hit} />
}
