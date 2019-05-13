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

    return [category, query].filter(Boolean).join(' – ');
  },
  createURL({ qsModule, routeState, location }) {
    const { protocol, hostname, port = '', hash } = location;
    const portWithPrefix = port === '' ? '' : `:${port}`;
    const pathname = routeState.category
      ? `/${getCategorySlug(routeState.category)}/`
      : '';

    const searchState = {};
    if (routeState.q) searchState.q = encodeURIComponent(routeState.q);
    if (routeState.p !== 1) searchState.p = routeState.p;
    if (routeState.brands) searchState.brands = routeState.brands;

    const queryString = qsModule.stringify(searchState, {
      addQueryPrefix: true,
    });

    return `${protocol}//${hostname}${portWithPrefix}${pathname}${queryString}${hash}`;
  },
  parseURL({ qsModule, location }) {
    const routeStateString = location.pathname.split('/')[1];
    const category = getCategoryName(routeStateString.split('/')[0]);
    const queryParameters = qsModule.parse(location.search.slice(1));
    const { q = '', p = 1, brands = 'all' } = queryParameters;

    return {
      q: decodeURIComponent(q),
      p,
      category: decodeURIComponent(category),
      brands,
    };
  },
});

const stateMapping = {
  stateToRoute(uiState) {
    return {
      q: uiState.query || '',
      p: uiState.page || 1,
      category: (uiState.menu && uiState.menu.categories) || '',
      brands:
        (uiState.refinementList &&
          uiState.refinementList.brand &&
          uiState.refinementList.brand.join(',')) ||
        '',
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
        brand:
          (routeState.brands &&
            routeState.brands !== 'all' &&
            routeState.brands.split(',')) ||
          [],
      },
    };
  },
};

const searchRouter = {
  router,
  stateMapping,
};

export default searchRouter;
