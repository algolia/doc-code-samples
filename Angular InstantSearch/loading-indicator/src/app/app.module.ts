import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgAisModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";
import { LoadingIndicator } from "./loading-indicator.component";

@NgModule({
  declarations: [AppComponent, LoadingIndicator],
  imports: [NgAisModule.forRoot(), BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
