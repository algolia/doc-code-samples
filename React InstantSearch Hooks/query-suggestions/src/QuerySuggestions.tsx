import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import {
  useInstantSearch,
  useMenu,
  useSearchBox,
} from 'react-instantsearch-hooks-web';

import { Autocomplete } from './Autocomplete';
import { searchClient } from './searchClient';

export function QuerySuggestions() {
  const { setIndexUiState } = useInstantSearch();
  const { query } = useSearchBox();
  useMenu({ attribute: 'categories' });

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

  return (
    <Autocomplete
      placeholder="Search for products..."
      plugins={[querySuggestionsPlugin]}
      initialState={{ query }}
      onReset={() =>
        setIndexUiState((setIndexUiState) => ({
          ...setIndexUiState,
          query: '',
          menu: { categories: '' },
        }))
      }
    />
  );
}
