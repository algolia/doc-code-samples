import { Component } from "@angular/core";
import * as algoliasearch from "algoliasearch";

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
  public config = {
    indexName: "airports",
    searchClient
  };

  public searchParameters = { query: "" };
}
