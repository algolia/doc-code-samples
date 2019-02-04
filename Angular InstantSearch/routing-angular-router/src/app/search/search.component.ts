import { Component } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html"
})
export class SearchComponent {
  config = {
    appId: "B1G2GM9NG0",
    apiKey: "aadef574be1f9252bb48d4ea09b5cfe5",
    indexName: "demo_ecommerce",
    routing: true,
  };
}
