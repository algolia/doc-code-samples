export const predefinedItems = {
  getSources({ query }) {
    if (query) {
      return [];
    }

    return [
      {
        getSuggestions() {
          return [
            {
              title: "GitHub repository",
              url: "https://github.com/algolia/autocomplete.js/tree/next",
            },
            {
              title: "Documentation website",
              url: "https://algolia-autocomplete.netlify.app",
            },
            {
              title: "Algolia",
              url: "https://www.algolia.com",
            },
          ];
        },
        getSuggestionUrl(suggestion) {
          return suggestion.url;
        },
        templates: {
          header() {
            return `
              <div class="aa-PredefinedHeader">
                <p>Useful Links</p>
              </div>
            `;
          },
          item({ item, root }) {
            return `
              <div class="aa-PredefinedItem">
                <span class="item-icon">${icon}</span><a class="title" href="${item.url}" target="_blank">${item.title}</a>
              </div>
            `;
          },
        },
      },
    ];
  },
};

const icon = `<svg style="width:20px;height:20px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
  </svg>`;
