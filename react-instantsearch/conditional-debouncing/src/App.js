import { useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Highlight, Hits, InstantSearch, SearchBox } from 'react-instantsearch';

import 'instantsearch.css/themes/algolia.css';
import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const connection = navigator.connection;
let timerId = undefined;
let timeout = 0;

updateTimeout();

function App() {
  useEffect(() => {
    connection.addEventListener('change', updateTimeout);

    return () => connection.removeEventListener('change', updateTimeout);
  });

  return (
    <div className="container">
      <InstantSearch
        indexName="instant_search"
        searchClient={searchClient}
        insights={true}
      >
        <SearchBox queryHook={queryHook} />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

function queryHook(query, search) {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => search(query), timeout);
}

function updateTimeout() {
  timeout = ['slow-2g', '2g'].includes(connection?.effectiveType) ? 400 : 0;
}

function Hit({ hit }) {
  return (
    <div>
      <Highlight attribute="name" hit={hit} />
    </div>
  );
}

export default App;
