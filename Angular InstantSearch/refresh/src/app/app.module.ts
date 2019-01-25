import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgAisModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";
import { Refresh } from "./refresh.component";

@NgModule({
  declarations: [AppComponent, Refresh],
  imports: [NgAisModule.forRoot(), BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
