/* global instantsearch */

const encodedCategories = {
  Cameras: 'Cameras & Camcorders',
  Cars: 'Car Electronics & GPS',
  Phones: 'Cell Phones',
  TV: 'TV & Home Theater',
};

const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
  const newKey = encodedCategories[key];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {});

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name) {
  const encodedName = decodedCategories[name] || name;

  return encodedName
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
  const decodedSlug = encodedCategories[slug] || slug;

  return decodedSlug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}

const router = instantsearch.routers.history({
  windowTitle({ category, query }) {
    const queryTitle = query ? `Results for "${query}"` : 'Search';

    if (category) {
      return `${category} – ${queryTitle}`;
    }

    return queryTitle;
  },

  createURL({ qsModule, routeState, location }) {
    const urlParts = location.href.match(/^(.*?)\/search/);
    const baseUrl = `${urlParts ? urlParts[1] : ''}/`;

    const categoryPath = routeState.category
      ? `${getCategorySlug(routeState.category)}/`
      : '';
    const queryParameters = {};

    if (routeState.query) {
      queryParameters.query = encodeURIComponent(routeState.query);
    }
    if (routeState.page !== 1) {
      queryParameters.page = routeState.page;
    }
    if (routeState.brands) {
      queryParameters.brands = routeState.brands.map(encodeURIComponent);
    }

    const queryString = qsModule.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    });

    return `${baseUrl}search/${categoryPath}${queryString}`;
  },

  parseURL({ qsModule, location }) {
    const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
    const category = getCategoryName(
      (pathnameMatches && pathnameMatches[1]) || ''
    );
    const { query = '', page, brands = [] } = qsModule.parse(
      location.search.slice(1)
    );
    // `qs` does not return an array when there's a single value.
    const allBrands = Array.isArray(brands) ? brands : [brands].filter(Boolean);

    return {
      query: decodeURIComponent(query),
      page,
      brands: allBrands.map(decodeURIComponent),
      category,
    };
  },
});

const stateMapping = {
  stateToRoute(uiState) {
    // refer to uiState docs for details: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
    return {
      query: uiState.instant_search.query,
      page: uiState.instant_search.page,
      brands: uiState.instant_search.refinementList && uiState.instant_search.refinementList.brand,
      category: uiState.instant_search.menu && uiState.instant_search.menu.categories,
    };
  },

  routeToState(routeState) {
    // refer to uiState docs for details: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
    return {
      // eslint-disable-next-line camelcase
      instant_search: {
        query: routeState.query,
        page: routeState.page,
        menu: {
          categories: routeState.category,
        },
        refinementList: {
          brand: routeState.brands,
        },
      }
    };
  },
};

const searchRouting = {
  router,
  stateMapping,
};

export default searchRouting;
