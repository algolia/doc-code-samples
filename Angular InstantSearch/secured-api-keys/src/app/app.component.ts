import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  (window as any).SERVER_DATA.ALGOLIA_API_KEY
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  config = {
    indexName: 'demo_ecommerce',
    searchClient,
  };
}
