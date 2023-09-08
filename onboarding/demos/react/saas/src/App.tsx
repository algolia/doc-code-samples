import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  Configure,
  InstantSearch,
  RefinementList,
  SearchBox,
  Stats,
} from 'react-instantsearch-hooks-web'

import { Content } from './Content'
import { Panel } from './Panel'

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
)

export function App() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="demo_saas"
      insights={true}
    >
      <main className="search-container">
        <Configure hitsPerPage={4} distinct={3} />
        <div className="right-panel">
          <div id="hits">
            {/* Uncomment the following widget to add hits list */}
            {/* <Content /> */}
          </div>
          <div id="searchbox">
            {/* Uncomment the following widget to add a search bar */}
            {/* <SearchBox placeholder="Search in your CRM" /> */}
          </div>
          <div id="stats">
            {/* Uncomment the following widget to add search stats */}
            {/* <Stats /> */}
          </div>
        </div>
        <div className="left-panel">
          <div id="type">
            {/* Uncomment the following widget to add categories list */}
            {/* <Panel header="Categories">
              <RefinementList
                attribute="type"
                translations={{ noResultsText: 'No results' }}
              />
            </Panel> */}
          </div>
        </div>
      </main>
    </InstantSearch>
  )
}
