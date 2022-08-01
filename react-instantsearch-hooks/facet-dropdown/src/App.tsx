import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  HierarchicalMenu,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RangeInput,
  RefinementList,
  SearchBox,
} from 'react-instantsearch-hooks-web';
import type { Hit as AlgoliaHit } from 'instantsearch.js';

import { Dropdown } from './Dropdown';

import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const closeOnChange = () => window.innerWidth > 375;

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
          <a href="/">facet-dropdown</a>
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

            <div className="search-panel__filters">
              <Dropdown closeOnChange={closeOnChange}>
                <RefinementList
                  attribute="brand"
                  searchable={true}
                  searchablePlaceholder="Search..."
                />
              </Dropdown>

              <Dropdown closeOnChange={closeOnChange}>
                <RefinementList attribute="type" />
              </Dropdown>

              <Dropdown
                buttonText={({ refinements }) => {
                  const label = refinements[0]?.label.split(' > ').pop();
                  return label ? `Category (${label})` : `Category`;
                }}
              >
                <HierarchicalMenu
                  attributes={[
                    'hierarchicalCategories.lvl0',
                    'hierarchicalCategories.lvl1',
                    'hierarchicalCategories.lvl2',
                  ]}
                />
              </Dropdown>

              <Dropdown
                closeOnChange={closeOnChange}
                buttonText={({ refinements }) => {
                  const [start, end] = refinements;
                  return start || end
                    ? `Price (${(start || end).label}${
                        end ? ' & ' + end.label : ''
                      })`
                    : `Price`;
                }}
              >
                <RangeInput attribute="price" />
              </Dropdown>
            </div>

            <Hits hitComponent={Hit} />

            <Pagination className="search-panel__pagination" />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
