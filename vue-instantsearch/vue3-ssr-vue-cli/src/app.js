import { createSSRApp, h } from 'vue';
import algoliasearch from 'algoliasearch/lite';
import { createServerRootMixin } from 'vue-instantsearch/vue3/es';
import qs from 'qs';
import App from './App.vue';
import { createRouter } from './router';

export function createApp({ renderToString, context } = {}) {
  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );

  let resultsState;
  const router = createRouter();

  const app = createSSRApp({
    mixins: [
      createServerRootMixin({
        renderToString,
        indexName: 'instant_search',
        searchClient,
        insights: true,
        routing: {
          router: {
            read() {
              let url;
              if (context) {
                url = context.url;
              } else {
                url =
                  typeof window === 'object' &&
                  typeof window.location === 'object'
                    ? window.location.href
                    : '';
              }

              const search = url.slice(url.indexOf('?'));
              return qs.parse(search, {
                ignoreQueryPrefix: true,
              });
            },
            write(routeState) {
              router.push({
                query: routeState,
              });
            },
            createURL(routeState) {
              return router.resolve({ query: routeState }).href;
            },
            onUpdate(callback) {
              this._onPopState = () => {
                callback(this.read());
              };
              typeof window === 'object' &&
                window.addEventListener('popstate', this._onPopState);
            },
            dispose() {
              typeof window === 'object' &&
                window.removeEventListener('popstate', this._onPopState);
              this.write();
            },
          },
          stateMapping: {
            stateToRoute(uiState) {
              return Object.keys(uiState).reduce(
                (state, indexId) => ({
                  ...state,
                  [indexId]: getIndexStateWithoutConfigure(uiState[indexId]),
                }),
                {}
              );
            },
            routeToState(routeState = {}) {
              return Object.keys(routeState).reduce(
                (state, indexId) => ({
                  ...state,
                  [indexId]: getIndexStateWithoutConfigure(routeState[indexId]),
                }),
                {}
              );
            },
          },
        },
      }),
    ],
    async serverPrefetch() {
      resultsState = await this.instantsearch.findResultsState({
        component: this,
        renderToString,
      });
      return resultsState;
    },
    beforeMount() {
      if (typeof window === 'object' && window.__ALGOLIA_STATE__) {
        this.instantsearch.hydrate(window.__ALGOLIA_STATE__);
        delete window.__ALGOLIA_STATE__;
      }
    },
    render: () => h(App),
  });
  app.use(router);

  return { app, router, getResultsState: () => resultsState };
}

function getIndexStateWithoutConfigure(uiState) {
  // eslint-disable-next-line no-unused-vars
  const { configure, ...trackedUiState } = uiState;
  return trackedUiState;
}
