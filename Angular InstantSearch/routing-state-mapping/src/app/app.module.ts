import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgAisModule } from "angular-instantsearch";

import { RouterModule, Routes } from "@angular/router";

import { SearchComponent } from "./search/search.component";
import { IndexComponent } from "./index/index.component";

const appRoutes: Routes = [
  { path: "search", component: SearchComponent },
  { path: "", component: IndexComponent }
];

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, SearchComponent, IndexComponent],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
