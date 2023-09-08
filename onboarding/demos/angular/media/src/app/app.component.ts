import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  config = {
    appId: "B1G2GM9NG0",
    apiKey: "aadef574be1f9252bb48d4ea09b5cfe5",
    indexName: "demo_media",
    searchParameters: {
      hitsPerPage: 3,
      attributesToSnippet: ["content:14"],
      snippetEllipsisText: " [...]"
    }
  };
}
