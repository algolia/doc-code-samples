import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgAisModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";

import { AgmCoreModule } from "@agm/core";
import { GeoSearchComponent } from "./geo-search.component";

@NgModule({
  declarations: [AppComponent, GeoSearchComponent],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBawL8VbstJDdU5397SUX7pEt9DslAwWgQ"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
