import {
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  Menu,
  ClearRefinements,
  SearchBox,
} from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';

import routing from './search-routing';

import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

function Panel({ header, footer, children }) {
  return (
    <div className="ais-Panel">
      {header && <div className="ais-Panel-header">{header}</div>}
      <div className="ais-Panel-body">{children}</div>
      {footer && <div className="ais-Panel-footer">{footer}</div>}
    </div>
  );
}

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
            <ClearRefinements />

            <Panel header="Category">
              <Menu attribute="categories" />
            </Panel>

            <Panel header="Brands">
              <RefinementList attribute="brand" />
            </Panel>
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
