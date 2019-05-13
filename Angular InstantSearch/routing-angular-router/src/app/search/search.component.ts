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
    routing: true,
  };
}
