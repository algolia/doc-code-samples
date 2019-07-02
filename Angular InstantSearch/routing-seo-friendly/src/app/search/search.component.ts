import { Component } from "@angular/core";
import { history as historyRouter } from "instantsearch.js/es/lib/routers";
import algoliasearch from "algoliasearch/lite";

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name) {
  return name
    .split(" ")
    .map(encodeURIComponent)
    .join("+");
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
  return slug
    .split("+")
    .map(decodeURIComponent)
    .join(" ");
}

const searchClient = algoliasearch(
  "B1G2GM9NG0",
  "aadef574be1f9252bb48d4ea09b5cfe5"
);

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html"
})
export class SearchComponent {
  config = {
    indexName: "demo_ecommerce",
    searchClient,
    routing: {
      router: historyRouter({
        windowTitle({ category, query }) {
          const queryTitle = query ? `Results for "${query}"` : "Search";

          if (category) {
            return `${category} – ${queryTitle}`;
          }

          return queryTitle;
        },

        createURL({ qsModule, routeState, location }) {
          const urlParts = location.href.match(/^(.*?)\/search/);
          const baseUrl = `${urlParts ? urlParts[1] : ""}/`;

          const categoryPath = routeState.category
            ? `${getCategorySlug(routeState.category)}/`
            : "";
          const queryParameters = {} as any;

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
            arrayFormat: "repeat"
          });

          return `${baseUrl}search/${categoryPath}${queryString}`;
        },

        parseURL({ qsModule, location }) {
          const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
          const category = getCategoryName(
            decodeURIComponent(pathnameMatches && pathnameMatches[1] || "")
          );
          const { query = "", page, brands = [] } = qsModule.parse(
            location.search.slice(1)
          );
          // `qs` does not return an array when there's a single value.
          const allBrands = Array.isArray(brands)
            ? brands
            : [brands].filter(Boolean);

          return {
            query: decodeURIComponent(query),
            page,
            brands: allBrands.map(decodeURIComponent),
            category
          };
        }
      }),

      stateMapping: {
        stateToRoute(uiState) {
          return {
            query: uiState.query,
            page: uiState.page,
            brands: uiState.refinementList && uiState.refinementList.brand,
            category: uiState.menu && uiState.menu.categories
          };
        },

        routeToState(routeState) {
          return {
            query: routeState.query,
            page: routeState.page,
            menu: {
              categories: routeState.category
            },
            refinementList: {
              brand: routeState.brands
            }
          };
        }
      }
    }
  };
}
