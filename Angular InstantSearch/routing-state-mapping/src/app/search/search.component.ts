import { Component } from "@angular/core";
import algoliasearch from "algoliasearch/lite";

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
      stateMapping: {
        stateToRoute(uiState) {
          return {
            q: uiState.query || "",
            brands:
              (uiState.refinementList &&
                uiState.refinementList.brand &&
                uiState.refinementList.brand.join("~")) ||
              "all",
            p: uiState.page || 1
          };
        },
        routeToState(routeState) {
          if (routeState.brands === "all") routeState.brands = undefined;

          return {
            query: routeState.q,
            refinementList: {
              brand: routeState.brands && routeState.brands.split("~")
            },
            page: routeState.p
          };
        }
      }
    }
  };
}
