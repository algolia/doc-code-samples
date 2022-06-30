import algoliasearch from 'algoliasearch/lite';
import {
  Highlight,
  InstantSearch,
  SearchBox,
  Snippet,
} from 'react-instantsearch-hooks-web';

import { InfiniteHits } from './InfiniteHits';

import 'instantsearch.css/themes/algolia.css';
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
        <InfiniteHits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

function Hit({ hit }) {
  return (
    <article>
      <h2>
        <Highlight attribute="name" hit={hit} />
      </h2>
      <p>
        <Snippet attribute="description" hit={hit} />
      </p>
    </article>
  );
}

export default App;
