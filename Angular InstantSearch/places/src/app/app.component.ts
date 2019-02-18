import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  onSuggestion($event) {
    console.log($event);
  }
  onClear($event) {
    console.log($event);
  }
}
