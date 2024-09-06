import {
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';

import { RangeSlider } from './RangeSlider';

import './App.css';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

function App() {
  return (
    <div className="container">
      <InstantSearch
        searchClient={searchClient}
        indexName="demo_ecommerce"
        insights={true}
      >
        <div className="search-panel">
          <div className="search-panel__filters">
            <RefinementList attribute="brand" />
            <RangeSlider attribute="price" />
          </div>

          <div className="search-panel__results">
            <SearchBox className="searchbox" placeholder="Search" />
            <Hits />

            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default App;
