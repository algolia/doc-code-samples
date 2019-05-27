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
    const { protocol, hostname, port = '', hash } = location;
    const portWithPrefix = port === '' ? '' : `:${port}`;
    const pathname = routeState.category
      ? `/${getCategorySlug(routeState.category)}/`
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

    return `${protocol}//${hostname}${portWithPrefix}${pathname}${queryString}${hash}`;
  },
  parseURL({ qsModule, location }) {
    const routeStateString = location.pathname.split('/')[1];
    const category = getCategoryName(routeStateString.split('/')[0]);
    const queryParameters = qsModule.parse(location.search.slice(1));
    const { query = '', page, brands } = queryParameters;

    return {
      query: decodeURIComponent(query),
      page,
      category: decodeURIComponent(category),
      brands: brands && brands.map(decodeURIComponent),
    };
  },
});

const stateMapping = {
  stateToRoute(uiState) {
    return {
      query: uiState.query,
      page: uiState.page,
      category: uiState.menu && uiState.menu.categories,
      brands: uiState.refinementList && uiState.refinementList.brand,
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
