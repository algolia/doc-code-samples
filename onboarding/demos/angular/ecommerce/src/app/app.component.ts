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
    indexName: "demo_ecommerce",
    searchParameters: {
      hitsPerPage: 5,
      attributesToSnippet: ["description:24"],
      snippetEllipsisText: " [...]"
    }
  };

  groupByType(items: Object[]) {
    const newItems = {};
    items.forEach((item: { type }) => {
      if (!newItems[item.type]) {
        newItems[item.type] = [item];
      } else {
        newItems[item.type].push(item);
      }
    });
    newItems["isEmpty"] = Object.keys(newItems).length === 0;
    return newItems;
  }
}
