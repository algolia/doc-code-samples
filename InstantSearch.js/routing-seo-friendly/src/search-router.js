/* global instantsearch */

function getCategorySlug(name) {
  return name.replace(/\s/g, '+');
}

function getCategoryName(slug) {
  return slug.replace(/\+/g, ' ');
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
    let baseUrl = location.href.split('/search/')[0];

    if (baseUrl[baseUrl.length - 1] !== '/') {
      baseUrl += '/';
    }

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
      category: decodeURIComponent(category),
    };
  },
});

const stateMapping = {
  stateToRoute(uiState) {
    return {
      query: uiState.query,
      page: uiState.page,
      brands: uiState.refinementList && uiState.refinementList.brand,
      category: uiState.menu && uiState.menu.categories,
    };
  },

  routeToState(routeState) {
    return {
      query: routeState.query,
      page: routeState.page,
      menu: {
        categories: routeState.category,
      },
      refinementList: {
        brand: routeState.brands,
      },
    };
  },
};

const searchRouter = {
  router,
  stateMapping,
};

export default searchRouter;
