import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import {RefreshComponent} from "./refresh.component";

@NgModule({
  declarations: [
    AppComponent,
    RefreshComponent
  ],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
