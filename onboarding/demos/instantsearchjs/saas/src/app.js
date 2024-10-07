/* global instantsearch */

import { hitTemplate } from "./helpers";

const search = instantsearch({
  appId: "B1G2GM9NG0",
  apiKey: "aadef574be1f9252bb48d4ea09b5cfe5",
  indexName: "demo_saas",
  searchParameters: {
    hitsPerPage: 4,
    distinct: 3
  }
});

// Uncomment the following widget to add hits list.

/* search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: () => "No results.",
      allItems(res) {
        return hitTemplate(res);
      }
    }
  })
); */

// Uncomment the following widget to add a search bar.

/* search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search in your CRM",
    autofocus: false
  })
); */

// Uncomment the following widget to add search stats.

/* search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats",
    templates: {
      body(hit) {
        return `<span role="img" aria-label="emoji">⚡️</span> <strong>${hit.nbHits}</strong> results found ${
          hit.query != "" ? `for <strong>"${hit.query}"</strong>` : ``
        } in <strong>${hit.processingTimeMS}ms</strong>`;
      }
    }
  })
); */

// Uncomment the following widget to add types list.

/* search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#type",
    attributeName: "type",
    autoHideContainer: false,
    templates: {
      header: () => "Categories"
    }
  })
); */

search.start();
