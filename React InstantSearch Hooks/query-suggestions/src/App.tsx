import algoliasearch from 'algoliasearch/lite';

import {
  Configure,
  CurrentRefinements,
  Highlight,
  Hits,
  InstantSearch,
} from 'react-instantsearch-hooks-web';

import { Autocomplete } from './Autocomplete';

import './App.css';

import type { Hit } from 'instantsearch.js';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

export function App() {
  return (
    <div className="container">
      <InstantSearch searchClient={searchClient} indexName="instant_search">
        <Configure hitsPerPage={16} />
        <Autocomplete searchClient={searchClient} />

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
