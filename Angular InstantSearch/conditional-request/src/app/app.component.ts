import { Component } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';

const algoliaClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public config = {
    indexName: 'instant_search',
    searchClient,
  };
}
