import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import {
  MultipleQueriesQuery,
  MultipleQueriesResponse,
  SearchResponse,
} from '@algolia/client-search';

const originalSearchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

const search: typeof originalSearchClient.search = <THit>(
  queries: readonly MultipleQueriesQuery[]
) => {
  if (queries.every(({ params }) => !params || !params.query)) {
    return Promise.resolve({
      results: queries.map(() => ({
        exhaustiveNbHits: false,
        hits: [],
        hitsPerPage: 0,
        nbHits: 0,
        nbPages: 0,
        page: 0,
        params: '',
        processingTimeMS: 0,
        query: '',
      })),
    });
  }

  return originalSearchClient.search<THit>(queries);
};

const searchClient = {
  ...originalSearchClient,
  search,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  config = {
    indexName: 'demo_ecommerce',
    searchClient,
  };
}
