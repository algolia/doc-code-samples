import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor() {}

  config = {
    indexName: 'demo_ecommerce',
    searchClient,
    routing: {
      stateMapping: {
        stateToRoute(uiState: any) {
          // refer to uiState docs for details: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
          return {
            query: uiState.demo_ecommerce.query,
            page: uiState.demo_ecommerce.page,
            brands:
              (uiState.demo_ecommerce.refinementList &&
                uiState.demo_ecommerce.refinementList.brand &&
                uiState.demo_ecommerce.refinementList.brand.join("~")) ||
              "all",
            category: uiState.demo_ecommerce.menu && uiState.demo_ecommerce.menu.categories,
          };
        },

        routeToState(routeState: any) {
          // refer to uiState docs for details: https://www.algolia.com/doc/api-reference/widgets/ui-state/js/
          return {
            // eslint-disable-next-line camelcase
            demo_ecommerce: {
              query: routeState.query,
              page: routeState.page,
              menu: {
                categories: routeState.category,
              },
              refinementList: {
                brand: routeState.brands && (routeState.brands === 'all' ? [] : routeState.brands.split("~"))
              },
            }
          };
        },
      },
    },
  };
}
