import {
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';

import './App.css';
import { Insights } from './Insights';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

function App() {
  return (
    <div className="container">
      <InstantSearch searchClient={searchClient} indexName="demo_ecommerce">
        <Insights />
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

function Hit({ hit, sendEvent }) {
  return (
    <div>
      <Highlight attribute="name" hit={hit} />
      <button
        type="button"
        onClick={() => {
          sendEvent('click', hit, 'Product Added');
        }}
      >
        Add to cart
      </button>
      <button
        type="button"
        onClick={() => {
          sendEvent('conversion', hit, 'Product Ordered');
        }}
      >
        Order
      </button>
    </div>
  );
}

export default App;
