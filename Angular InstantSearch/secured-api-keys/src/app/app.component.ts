import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  config = {
    appId: "B1G2GM9NG0",
    apiKey: (window as any).SERVER_DATA.ALGOLIA_API_KEY,
    indexName: "demo_ecommerce"
  };
}
