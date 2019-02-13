import { Component } from "@angular/core";

declare var aa: (eventName: string, props: object) => void;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  config = {
    appId: "B1G2GM9NG0",
    apiKey: "aadef574be1f9252bb48d4ea09b5cfe5",
    indexName: "demo_ecommerce"
  };

  clickedObjectIDsAfterSearch(props) {
    aa('clickedObjectIDsAfterSearch', props)
  }
  convertedObjectIDsAfterSearch(props) {
    aa('convertedObjectIDsAfterSearch', props)
  }
}
