import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  Highlight,
  Hits,
  Index,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch-hooks-web';

import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

function App() {
  return (
    <div className="container">
      <InstantSearch indexName="instant_search" searchClient={searchClient}>
        <SearchBox />

        <Index indexName="instant_search">
          <h2>
            index: <code>instant_search</code>
          </h2>
          <Configure hitsPerPage={16} />
          <Hits hitComponent={ProductHit} />
        </Index>

        <Index indexName="instant_search_demo_query_suggestions">
          <h2>
            index: <code>instant_search_demo_query_suggestions</code>
          </h2>
          <Configure hitsPerPage={8} />
          <Hits hitComponent={QuerySuggestionHit} />
        </Index>
      </InstantSearch>
    </div>
  );
}

function ProductHit({ hit }) {
  return (
    <div>
      <Highlight attribute="name" hit={hit} />
    </div>
  );
}

function QuerySuggestionHit({ hit }) {
  return (
    <div>
      <Highlight attribute="query" hit={hit} />
    </div>
  );
}

export default App;
