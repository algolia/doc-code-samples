import React from 'react'
import { useInstantSearch } from 'react-instantsearch-hooks-web'
import { Hits } from './Hits'

export function Content() {
  const { results } = useInstantSearch()

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <div>
        No results found for <strong>{results.query}</strong>.
      </div>
    )
  }

  return <Hits />
}
