import { injectedInfiniteHits } from './injected-infinite-hits';
const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  injectedInfiniteHits({
    container: '#hits',
    slots() {
      return [
        {
          getHits: () => [{ cool: true }],
          injectAt: 1,
        },
        {
          getHits: () => [{ cool: false }],
          injectAt: Math.random() > 0.5 ? 1 : false,
        },
      ];
    },
    templates: {
      item({ hit }, { html }) {
        return html`${hit.name}`;
      },
      injected({ hit }, { html }) {
        return html`cool=${String(hit.cool)}`;
      },
    },
  }),
]);

search.start();
