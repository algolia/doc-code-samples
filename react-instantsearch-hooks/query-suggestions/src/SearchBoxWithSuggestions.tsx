import { useCallback, useMemo } from 'react';

import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import {
  useInstantSearch,
  useMenu,
  useSearchBox,
} from 'react-instantsearch-hooks-web';

import { Autocomplete } from './Autocomplete';
import { searchClient } from './searchClient';

export function SearchBoxWithSuggestions() {
  const { setIndexUiState } = useInstantSearch();
  const { query } = useSearchBox();
  useMenu({ attribute: 'categories' });

  const plugins = useMemo(() => {
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

    return [querySuggestionsPlugin];
  }, []);

  const initialState = useMemo(() => ({ query }), [query]);

  const onReset = useCallback(
    () =>
      setIndexUiState((indexUiState) => ({
        ...indexUiState,
        query: '',
        menu: { categories: '' },
      })),
    []
  );

  return (
    <Autocomplete
      placeholder="Search for products..."
      plugins={plugins}
      initialState={initialState}
      onReset={onReset}
    />
  );
}
