import { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import {
  useInstantSearch,
  useMenu,
  useSearchBox,
} from 'react-instantsearch-hooks-web';

import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import '@algolia/autocomplete-theme-classic';

import type { SearchClient } from 'algoliasearch/lite';

type AutocompleteProps = {
  searchClient: SearchClient;
};

export function Autocomplete({ searchClient }: AutocompleteProps) {
  const container = useRef<HTMLDivElement>(null);

  const { setIndexUiState } = useInstantSearch();
  const { query } = useSearchBox();
  useMenu({ attribute: 'categories' });

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const querySuggestionsPlugin = createQuerySuggestionsPlugin({
      indexName: 'instant_search_demo_query_suggestions',
      searchClient,
      categoryAttribute: [
        'instant_search',
        'facets',
        'exact_matches',
        'categories',
      ],
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setIndexUiState((indexUiState) => ({
              ...indexUiState,
              query: item.query,
              menu: {
                categories: item.__autocomplete_qsCategory || '',
              },
            }));
          },
        };
      },
    });

    const instance = autocomplete({
      container: container.current,
      initialState: { query },
      onReset() {
        setIndexUiState((indexUiState) => ({
          ...indexUiState,
          query: '',
          menu: { categories: '' },
        }));
      },
      renderer: { createElement, Fragment, render },
      plugins: [querySuggestionsPlugin],
    });

    return () => instance.destroy();
  }, [query]);

  return <div ref={container} />;
}
