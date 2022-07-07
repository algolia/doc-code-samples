import {
  Configure,
  CurrentRefinements,
  Highlight,
  Hits,
  InstantSearch,
} from 'react-instantsearch-hooks-web';

import './App.css';

import type { Hit } from 'instantsearch.js';

import { SearchBoxWithSuggestions } from './SearchBoxWithSuggestions';
import { searchClient } from './searchClient';

export function App() {
  return (
    <div className="container">
      <InstantSearch searchClient={searchClient} indexName="instant_search">
        <Configure hitsPerPage={16} />

        <SearchBoxWithSuggestions />

        <CurrentRefinements
          className="current-refinements"
          includedAttributes={['query', 'categories']}
        />

        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function Hit({ hit }: HitProps) {
  return (
    <article>
      <Highlight attribute="name" hit={hit} />
    </article>
  );
}
