import algoliasearch from 'algoliasearch/lite';
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch-hooks-web';

import 'instantsearch.css/themes/algolia.css';
import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

let timerId = undefined;

function App() {
  return (
    <div className="container">
      <InstantSearch indexName="instant_search" searchClient={searchClient}>
        <SearchBox
          queryHook={(query, search) => {
            const timeout = navigator.connection?.effectiveType?.includes('2g')
              ? 400
              : 0;

            if (timerId) {
              clearTimeout(timerId);
            }

            timerId = setTimeout(() => search(query), timeout);
          }}
        />
        <Hits hitComponent={Hit} />
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
