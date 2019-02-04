import { Component } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html"
})
export class SearchComponent {
  config = {
    appId: "B1G2GM9NG0",
    apiKey: "aadef574be1f9252bb48d4ea09b5cfe5",
    indexName: "demo_ecommerce",
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
