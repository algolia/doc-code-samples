import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GeoSearchComponent } from './geo-search.component';

@NgModule({
  declarations: [AppComponent, GeoSearchComponent],
  imports: [NgAisModule.forRoot(), BrowserModule, GoogleMapsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
