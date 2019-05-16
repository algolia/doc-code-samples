/* global instantsearch */

function getCategorySlug(name) {
  return name.replace(/\s/g, '-');
}

function getCategoryName(slug) {
  return slug.replace(/-/g, ' ');
}

const router = instantsearch.routers.history({
  windowTitle({ category, q }) {
    const query = q ? `Results for "${q}"` : 'Search';

    if (category) {
      return `${category} – ${query}`;
    }

    return query;
  },
  createURL({ qsModule, routeState, location }) {
    const { protocol, hostname, port = '', hash } = location;
    const portWithPrefix = port === '' ? '' : `:${port}`;
    const pathname = routeState.category
      ? `/${getCategorySlug(routeState.category)}/`
      : '';
    const queryParameters = {};

    if (routeState.q) {
      queryParameters.q = encodeURIComponent(routeState.q);
    }
    if (routeState.p !== 1) {
      queryParameters.p = routeState.p;
    }
    if (routeState.brands) {
      queryParameters.brands = encodeURIComponent(routeState.brands);
    }

    const queryString = qsModule.stringify(queryParameters, {
      addQueryPrefix: true,
    });

    return `${protocol}//${hostname}${portWithPrefix}${pathname}${queryString}${hash}`;
  },
  parseURL({ qsModule, location }) {
    const routeStateString = location.pathname.split('/')[1];
    const category = getCategoryName(routeStateString.split('/')[0]);
    const queryParameters = qsModule.parse(location.search.slice(1));
    const { q = '', p, brands } = queryParameters;

    return {
      q: decodeURIComponent(q),
      p,
      category: decodeURIComponent(category),
      brands: decodeURIComponent(brands),
    };
  },
});

const stateMapping = {
  stateToRoute(uiState) {
    return {
      q: uiState.query,
      p: uiState.page,
      category: uiState.menu && uiState.menu.categories,
      brands:
        uiState.refinementList &&
        uiState.refinementList.brand &&
        uiState.refinementList.brand.join('|'),
    };
  },
  routeToState(routeState) {
    return {
      query: routeState.q,
      page: routeState.p,
      menu: {
        categories: routeState.category,
      },
      refinementList: {
        brand: routeState.brands && routeState.brands.split('|'),
      },
    };
  },
};

const searchRouter = {
  router,
  stateMapping,
};

export default searchRouter;
