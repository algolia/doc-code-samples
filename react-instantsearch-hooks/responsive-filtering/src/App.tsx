import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  Highlight,
  InfiniteHits,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch-hooks-web';
import type { Hit as AlgoliaHit } from 'instantsearch.js';

import { ResponsiveFilters } from './ResponsiveFilters/ResponsiveFilters';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

type HitProps = {
  hit: AlgoliaHit;
};

function Hit({ hit }: HitProps) {
  return (
    <article>
      <h1>
        <Highlight attribute="name" hit={hit} />
      </h1>
      <p>
        <Highlight attribute="description" hit={hit} />
      </p>
    </article>
  );
}

export function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">responsive-filtering</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/react-instantsearch">
            React InstantSearch Hooks
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="instant_search">
          <Configure hitsPerPage={8} />

          <div className="search-panel">
            <SearchBox placeholder="Search..." className="searchbox" />

            <ResponsiveFilters />

            <div className="search-panel__results">
              <InfiniteHits hitComponent={Hit} showPrevious={false} />
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
