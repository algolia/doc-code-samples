import { Component } from "@angular/core";
import * as algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public configSuggestions = {
    indexName: "instant_search_demo_query_suggestions",
    searchClient
  };
  public configResults = {
    indexName: "instant_search",
    searchClient
  };

  public searchParameters : {
    query: string;
    disjunctiveFacets?: string[];
    disjunctiveFacetsRefinements?: object;
  } = { query: ""};

  setQuery({ query, category }: { query: string; category: string }) {
    this.searchParameters.query = query;
    if (category) {
      this.searchParameters.disjunctiveFacets = ["categories"];
      this.searchParameters.disjunctiveFacetsRefinements = {
        categories: [category]
      };
    }
  }
}
