import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { IndexWidget, Widget } from 'instantsearch.js';
import history from 'instantsearch.js/es/lib/routers/history';
import InstantSearch from 'instantsearch.js/es/lib/InstantSearch';
import { Router } from '@angular/router';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

@Injectable({
  providedIn: 'root',
})
export class InstantSearchService {
  public instantSearchInstance: InstantSearch;

  constructor(router: Router) {
    this.instantSearchInstance = new InstantSearch({
      searchClient,
      indexName: 'instant_search',
      future: { preserveSharedStateOnUnmount: true },
      routing: {
        router: history({
          getLocation: () => {
            if (typeof window === 'undefined') {
              // no other way to get this in constructor
              return new URL(
                router['location']._locationStrategy._platformLocation.href
              ) as unknown as Location;
            }
            return window.location;
          },
        }),
      },
    });
  }

  start() {
    this.instantSearchInstance.start();
  }

  addWidgets(widgets: Array<Widget | IndexWidget>) {
    this.instantSearchInstance.addWidgets(widgets);
  }

  removeWidgets(widgets: Array<Widget | IndexWidget>) {
    this.instantSearchInstance.removeWidgets(widgets);
  }
}
