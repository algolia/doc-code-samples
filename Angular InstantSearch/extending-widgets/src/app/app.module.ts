import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { MenuSelect } from './menu-select.component';

@NgModule({
  declarations: [AppComponent, MenuSelect],
  imports: [NgAisModule.forRoot(), BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
