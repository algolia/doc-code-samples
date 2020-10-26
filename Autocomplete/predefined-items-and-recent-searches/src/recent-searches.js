import { createRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
const originalRecentSearches = createRecentSearchesPlugin({
  key: 'RECENT_SEARCH',
  limit: 5,
});

export const recentSearches = {
  ...originalRecentSearches,
  getSources(params) {
    const sources = originalRecentSearches.getSources(params);
    return sources.map((source) => ({
      ...source,
      templates: {
        ...source.templates,
        header() {
          if (source.getSuggestions().length === 0) {
            return '';
          }

          return `
            <div class="aa-RecentSearchesHeader">
              <p>Recent Searches</p>
            </div>
          `;
        },
      },
    }));
  },
};
