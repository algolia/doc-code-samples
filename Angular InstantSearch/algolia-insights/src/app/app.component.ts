import { Component } from "@angular/core";
import algoliasearch from "algoliasearch/lite";

declare var aa: (eventName: string, props: object) => void;

const searchClient = algoliasearch(
  "B1G2GM9NG0",
  "aadef574be1f9252bb48d4ea09b5cfe5"
);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  config = {
    indexName: "demo_ecommerce",
    searchClient
  };

  clickedObjectIDsAfterSearch(props) {
    aa("clickedObjectIDsAfterSearch", props);
  }
  convertedObjectIDsAfterSearch(props) {
    aa("convertedObjectIDsAfterSearch", props);
  }
}
