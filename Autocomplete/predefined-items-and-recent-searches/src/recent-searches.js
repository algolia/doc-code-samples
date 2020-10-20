import { createRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
const orgRecentSearches = createRecentSearchesPlugin({
  key: 'RECENT_SEARCH',
  limit: 5,
});

export const recentSearches = {
  ...orgRecentSearches,
  getSources(params) {
    const sources = orgRecentSearches.getSources(params);
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
