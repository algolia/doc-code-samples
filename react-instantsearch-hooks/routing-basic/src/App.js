import {
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-hooks-web';
import { history } from 'instantsearch.js/es/lib/routers';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import algoliasearch from 'algoliasearch/lite';

import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const routing = {
  router: history(),
  stateMapping: simple(),
};

function App() {
  return (
    <div className="container">
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        routing={routing}
        insights={true}
      >
        <div className="search-panel">
          <div className="search-panel__filters">
            <RefinementList attribute="brand" />
          </div>

          <div className="search-panel__results">
            <SearchBox className="searchbox" placeholder="Search" />
            <Hits hitComponent={Hit} />

            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

function Hit({ hit }) {
  return (
    <div>
      <Highlight attribute="name" hit={hit} />
    </div>
  );
}

export default App;
