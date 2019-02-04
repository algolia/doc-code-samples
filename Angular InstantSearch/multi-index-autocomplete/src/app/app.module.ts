import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatAutocompleteModule } from '@angular/material';

import { AutocompleteComponent } from './autocomplete.component'

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
  ],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
