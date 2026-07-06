import algoliasearch from 'algoliasearch/lite';
import {
  EXPERIMENTAL_Autocomplete,
  Highlight,
  InstantSearch,
} from 'react-instantsearch';

import 'instantsearch.css/themes/satellite.css';
import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

// Quick-access cards shown in the empty state.
const QUICK_ACCESS = [
  {
    title: 'Spring sale',
    subtitle: 'up to 60% off',
    image: 'https://picsum.photos/seed/spring-sale/300/200',
    href: '#',
  },
  {
    title: 'New collection',
    subtitle: 'spring / summer',
    image: 'https://picsum.photos/seed/new-collection/300/200',
    href: '#',
  },
];

// Right column: product previews with image, name, price, and highlight
function ProductItem({ item }) {
  return (
    <div className="demo-product">
      <div className="demo-product-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div>
        <p className="demo-product-name">
          <Highlight hit={item} attribute="name" />
        </p>
        <p className="demo-product-meta">
          {item.brand} · ${item.price}
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="page">
      <h1 className="page-title">Federated autocomplete (React)</h1>
      <p className="page-subtitle">
        Recent searches and Query Suggestions on the left, product previews on
        the right. Focus the input for the empty state, or type "phone" for the
        results state.
      </p>

      <InstantSearch indexName="instant_search" searchClient={searchClient}>
        <EXPERIMENTAL_Autocomplete
          placeholder="Search for products"
          // Left column, top: recent searches (stored in localStorage)
          showRecent={{
            headerComponent: () => (
              <span className="demo-source-header">Recent searches</span>
            ),
          }}
          // Left column, bottom: popular searches / Query Suggestions.
          // No header here — the panel renders it so the label can switch
          // between "Popular searches" (empty query) and "Suggestions" (typing).
          showQuerySuggestions={{
            indexName: 'instant_search_demo_query_suggestions',
            searchParameters: { hitsPerPage: 5 },
          }}
          // Right column: product previews
          indices={[
            {
              indexName: 'instant_search',
              searchParameters: { hitsPerPage: 5 },
              noResultsComponent: () => (
                <div className="demo-empty">No products found.</div>
              ),
              itemComponent: ProductItem,
            },
          ]}
          // `elements` is keyed by `recent`, `suggestions`, and each index name.
          // `indices` carries each source's raw `results`, which is what makes
          // the federated behavior possible.
          panelComponent={({ elements, indices }) => {
            const products = indices.find(
              (index) => index.indexName === 'instant_search'
            );
            const suggestions = indices.find(
              (index) =>
                index.indexName === 'instant_search_demo_query_suggestions'
            );
            const isEmptyQuery = products?.results?.query === '';
            const hasSuggestions = (suggestions?.hits?.length ?? 0) > 0;
            const quickAccess = QUICK_ACCESS;
            const categories = products?.results?.hits?.[0]?.categories ?? [];
            const nbHits = products?.results?.nbHits ?? 0;

            return (
              <div className="demo-grid">
                <div className="demo-column">
                  {elements.recent}
                  {hasSuggestions && (
                    <span className="demo-source-header">
                      {isEmptyQuery ? 'Popular searches' : 'Suggestions'}
                    </span>
                  )}
                  {elements.suggestions}
                  {!isEmptyQuery && categories.length > 0 && (
                    <div className="demo-category">{categories.join(' › ')}</div>
                  )}
                </div>
                <div className="demo-column">
                  {isEmptyQuery && quickAccess.length > 0 ? (
                    <ul className="demo-quick">
                      {quickAccess.map((entry) => (
                        <li key={entry.title}>
                          <a className="demo-quick-item" href={entry.href}>
                            <img src={entry.image} alt="" />
                            <span className="demo-quick-title">
                              {entry.title}
                            </span>
                            <span className="demo-quick-subtitle">
                              {entry.subtitle}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      {elements['instant_search']}
                      {nbHits > 5 && (
                        <a className="demo-see-all" href="#">
                          See all {nbHits.toLocaleString()} results
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          }}
        />
      </InstantSearch>
    </main>
  );
}

export default App;
