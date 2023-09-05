import { Component } from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  config = {
    appId: "B1G2GM9NG0",
    apiKey: "aadef574be1f9252bb48d4ea09b5cfe5",
    indexName: "demo_geo",
    searchParameters: {
      hitsPerPage: 6,
      getRankingInfo: true,
      aroundLatLngViaIP: true,
      typoTolerance: "min"
    }
  };

  roundNumber = number => parseInt(number, 10);
  betweenParentheses = string => `(${string})`;
}
