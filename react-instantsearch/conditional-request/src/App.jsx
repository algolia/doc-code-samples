import algoliasearch from 'algoliasearch/lite';
import { Highlight, Hits, InstantSearch, SearchBox } from 'react-instantsearch';

import 'instantsearch.css/themes/algolia.css';
import './App.css';

const algoliaClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

function App() {
  return (
    <div className="container">
      <InstantSearch
        indexName="instant_search"
        searchClient={searchClient}
        insights={true}
      >
        <SearchBox />
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
