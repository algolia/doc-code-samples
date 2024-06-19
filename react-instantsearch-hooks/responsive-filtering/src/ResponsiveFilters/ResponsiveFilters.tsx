import React from 'react';
import { Dialog } from '@reach/dialog';
import { VisuallyHidden } from '@reach/visually-hidden';

import { Filters } from './Filters';
import {
  ClearRefinements,
  SortBy,
  useCurrentRefinements,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';

export function ResponsiveFilters() {
  const [showFilters, setShowFilters] = React.useState(false);

  const { items } = useCurrentRefinements();
  const { results } = useInstantSearch();

  return (
    <div className="search-panel__filters">
      <div className="responsive-filters-buttons">
        <SortBy
          items={[
            { label: 'Featured', value: 'instant_search' },
            { label: 'Price ascending', value: 'instant_search_price_asc' },
            { label: 'Price descending', value: 'instant_search_price_desc' },
          ]}
          className="responsive-filters-buttons__sort"
        />

        <button
          className="responsive-filters-buttons__open"
          onClick={() => setShowFilters(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z"
              stroke="#fff"
              strokeWidth="1.29"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          Filters {items.length > 0 && `(${items.length})`}
        </button>
      </div>

      <div className="responsive-filters-desktop">
        <Filters />
      </div>

      <Dialog
        isOpen={showFilters}
        onDismiss={() => setShowFilters(false)}
        className="responsive-filters-modal"
        aria-label="Filters"
      >
        <div className="responsive-filters-modal__header">
          <h2>Filters</h2>
          <button
            className="responsive-filters-modal__close"
            onClick={() => setShowFilters(false)}
          >
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>
        </div>

        <div className="responsive-filters-modal__body">
          <Filters />
        </div>

        <div className="responsive-filters-modal__footer">
          <ClearRefinements
            translations={{ resetButtonText: 'Reset filters' }}
            className="responsive-filters-modal__clear"
          />

          <button
            className="responsive-filters-modal__apply"
            onClick={() => setShowFilters(false)}
          >
            See {results.nbHits.toLocaleString()} results
          </button>
        </div>
      </Dialog>
    </div>
  );
}
