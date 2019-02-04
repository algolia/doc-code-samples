import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgAisModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";
import { DebouncedSearchBox } from "./debounced-search-box.component";

@NgModule({
  declarations: [AppComponent, DebouncedSearchBox],
  imports: [NgAisModule.forRoot(), BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
