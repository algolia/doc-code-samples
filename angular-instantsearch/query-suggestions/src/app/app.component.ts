import { Component } from '@angular/core';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { SearchParameters } from 'angular-instantsearch/instantsearch/instantsearch';
import { QuerySuggestion } from './autocomplete.component';

type SearchConfig = {
  indexName: string;
  searchClient: SearchClient;
};

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly configSuggestions: SearchConfig = {
    indexName: 'instant_search_demo_query_suggestions',
    searchClient,
  };
  readonly configResults: SearchConfig = {
    indexName: 'instant_search',
    searchClient,
  };

  searchParameters: SearchParameters = { query: '' };

  setQuery({ query, category }: QuerySuggestion) {
    this.searchParameters = {
      ...this.searchParameters,
      query,
      ...(category
        ? {
            disjunctiveFacets: ['categories'],
            disjunctiveFacetsRefinements: { categories: [category] },
          }
        : {}),
    };
  }
}
