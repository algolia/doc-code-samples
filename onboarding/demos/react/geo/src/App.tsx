import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  Configure,
  InstantSearch,
  SearchBox,
  Stats,
} from 'react-instantsearch-hooks-web'

import { Map } from './Map'
import { Content } from './Content'

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
)

export function App() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="demo_geo"
      insights={true}
    >
      <main className="search-container">
        <Configure
          hitsPerPage={6}
          getRankingInfo
          aroundLatLngViaIP
          typoTolerance="min"
        />
        <div className="right-panel">
          <div id="map">
            {/* Uncomment the following widget to add a map */}
            {/* <Map /> */}
          </div>
          <div id="searchbox">
            {/* Uncomment the following widget to add a search bar */}
            {/* <SearchBox placeholder="Search airports by name, city, airport code" /> */}
          </div>
          <div id="stats">
            {/* Uncomment the following widget to add search stats */}
            {/* <Stats /> */}
          </div>
        </div>
        <div className="left-panel">
          <div id="hits">
            {/* Uncomment the following widget to add hits list */}
            {/* <Content /> */}
          </div>
        </div>
      </main>
    </InstantSearch>
  )
}
